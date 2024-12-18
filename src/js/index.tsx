/**
 * import: preact
 */
import { render, createContext, createRef } from "preact";
import * as React from "preact/compat";
import { useContext, useState, useEffect, useMemo, useRef } from "preact/hooks";
import Router, { Route } from "preact-router";

/**
 * import: libs
 */
import { Quran } from "@0x1eef/quran";
import { T } from "~/lib/t";
import classNames from "classnames";
import "core-js";

/**
 * import: hooks
 */
import { useTheme } from "~/hooks/useTheme";
import { useLocale } from "~/hooks/useLocale";
import { AudioState } from "~/hooks/useAudio";

/**
 * context: settings
 */
const SettingsContext = createContext({});

/**
 * globals: window
 */
const globals = {
  Quran,
  React,
  render,
  useContext,
  useState,
  useEffect,
  useMemo,
  useRef,
  createRef,
  forwardRef: React.forwardRef,
  SettingsContext,
  classNames,
  AudioState,
};
Object.assign(window, globals);

/**
 * require: components
 */
const { SurahRedirect } = require("~/components/SurahRedirect");
const { SurahIndex } = require("~/components/SurahIndex");
const { SurahStream } = require("~/components/SurahStream");
const { RandomSurah } = require("~/components/RandomSurah");

/**
 * app: routes
 */
const App = (function () {
  return () => {
    const t = T(require("@json/t.json"));
    const [theme, setTheme] = useTheme();
    const [locale, setLocale] = useLocale();
    return (
      <SettingsContext.Provider value={{ locale, setLocale, theme, setTheme }}>
        <Router>
          <Route path="/index.html" component={SurahRedirect} />
          <Route path="/:localeId/index.html" component={SurahIndex} t={t} />
          <Route path="/:localeId/:surahId" component={SurahStream} t={t} />
          <Route path="/:localeId/random" component={RandomSurah} />
        </Router>
      </SettingsContext.Provider>
    );
  };
})();

render(<App />, document.querySelector(".mount")!);
