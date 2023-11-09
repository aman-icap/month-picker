import * as styles from "./styles.module.css";
import { Calendar } from "./Calendar";
import { I18nProvider } from "@react-aria/i18n";
import { useMemo, useState } from "react";
import { DatePicker } from "./DatePicker";

const calendars = [
  { key: "gregory", name: "Gregorian" },
  { key: "japanese", name: "Japanese" },
  { key: "buddhist", name: "Buddhist" },
  { key: "roc", name: "Taiwan" },
  { key: "persian", name: "Persian" },
  { key: "indian", name: "Indian" },
  { key: "islamic-umalqura", name: "Islamic (Umm al-Qura)" },
  { key: "islamic-civil", name: "Islamic Civil" },
  { key: "islamic-tbla", name: "Islamic Tabular" },
  { key: "hebrew", name: "Hebrew" },
  { key: "coptic", name: "Coptic" },
  { key: "ethiopic", name: "Ethiopic" },
  { key: "ethioaa", name: "Ethiopic (Amete Alem)" }
];

const defaultOptions = new Intl.DateTimeFormat().resolvedOptions();

export default function App() {
  let [calendar, setCalendar] = useState(defaultOptions.calendar);
  let locale = useMemo(
    () => new Intl.Locale(defaultOptions.locale, { calendar }).toString(),
    [calendar]
  );
  return (
    <div className={styles.app}>
      {/* prettier-ignore */}
      <p style={{marginBottom: 50}}>This sandbox shows an example <strong><code>Calendar</code></strong> component built with <a href="https://react-spectrum.adobe.com/react-aria/" rel="noreferrer" target="_blank">React Aria</a> and <a href="https://github.com/css-modules/css-modules" rel="noreferrer" target="_blank">CSS Modules</a>. It also demonstrates how to add custom locale and calendar system aware month and year dropdowns to easily jump forward or backward in time.</p>
      <label style={{ display: "block", margin: "50px auto" }}>
        Calendar System:{" "}
        <select
          className={styles.select}
          value={calendar}
          onChange={(e) => setCalendar(e.target.value)}
        >
          {calendars.map((calendar, i) => (
            <option key={i} value={calendar.key}>
              {calendar.name}
            </option>
          ))}
        </select>
      </label>
      {/* <I18nProvider locale={locale}>
        <Calendar />
      </I18nProvider> */}
      <I18nProvider locale={locale}>
        <DatePicker />
      </I18nProvider>
    </div>
  );
}
