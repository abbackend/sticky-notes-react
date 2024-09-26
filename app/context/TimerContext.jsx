import { createContext, useEffect, useState } from "react";
import { fakeData } from "@/app/assets/fakeTimerData";
import Spinner from "@/app/icons/Spinner";

export const TimerContext = createContext();

const TimerProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState(null);
  const [footer, setFooter] = useState(null);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("timer", JSON.stringify({
        template: template,
        footer: footer
      }));
    }
  }, [template, footer]);

  const init = async () => {
    const response = await JSON.parse(localStorage.getItem("timer"));
    if (response && response.template && response.footer) {
      setTemplate(response.template);
      setFooter(response.footer);
    } else {
      const header = await JSON.parse(fakeData.templateHeader)
      const body = await JSON.parse(fakeData.templateBody)
      const footer = await generateFooter()
      setTemplate(`${header}${body}`)
      setFooter(footer);
    }

    setLoading(false);
  };

  const updateFooter = async (footer) => {
    let footerString = await generateFooter(footer);
    const resultString = footerString.replace('START_TIME', footer.start)
      .replace('LUNCH_TIME', footer.lunch)
      .replace('BREAK_TIME', footer.break)
      .replace('TOTAL_DESK', footer.working)
      .replace('TOTAL', footer.total);

    setFooter(resultString);
  }

  const generateFooter = async (footer = null) => {
    let string = await JSON.parse(fakeData.templateFooter);
    if (footer) {
      return string.replace('START_TIME', footer.start)
        .replace('LUNCH_TIME', footer.lunch)
        .replace('BREAK_TIME', footer.break)
        .replace('END_TIME', footer.end)
        .replace('TOTAL_DESK', footer.working)
        .replace('TOTAL', footer.total);
    }

    return string;
  }

  const contextData = { template, setTemplate, footer, updateFooter, setFooter };
  return (
    <TimerContext.Provider value={contextData}>
      {loading ? (
        <div className="flex items-center justify-center h-[100vh]">
          <Spinner size={100} />
        </div>
      ) : (
        children
      )}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
