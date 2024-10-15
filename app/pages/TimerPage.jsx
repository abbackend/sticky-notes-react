import { useContext, useEffect, useRef, useState } from "react";
import { TimerContext } from "@/app/context/TimerContext.jsx";
import { autoGrow, copyToClipBoard, formatTime } from "@/app/utils.js"
import Copy from "@/app/icons/Copy.jsx";
import Check from "@/app/icons/Check.jsx";
import Timer from "@/app/icons/Timer.jsx";
import Plus from "@/app/icons/Plus.jsx";
import Cross from "@/app/icons/Cross.jsx";

const TimerPage = () => {
  const { template, setTemplate, footer, updateFooter, setFooter } = useContext(TimerContext);
  const [copied, setCopied] = useState(false);
  const [startTime, setStartTime] = useState('00:00')
  const [lunchStart, setLunchStart] = useState('00:00')
  const [lunchEnd, setLunchEnd] = useState('00:00')
  const [lunchManual, setLunchManual] = useState('00:00')
  const [endTime, setEndTime] = useState('00:00')
  const [difference, setDifference] = useState(null)
  const [breaks, setBreaks] = useState([])

  const textAreaRef = useRef(null);
  const textAreaFooterRef = useRef(null);
  const breakId = useRef(1);
  const copyAction = () => {
    copyToClipBoard(`${template}${footer}`);
    setCopied(true);
  }

  const addBreak = () => {
    setBreaks((prevState) => [{
      id: breakId.current,
      start: '00:00',
      end: '00:00',
      manual: '00:00'
    }, ...prevState])

    breakId.current = breakId.current + 1;
  }

  const removeBreak = (id) => {
    setBreaks((prevState) => {
      return prevState.filter((el) => el.id != id);
    });
  }

  const changeBreak = (event, id, action) => {
    setBreaks((prevState) => {
      return prevState.map((el) => {
        if (el.id == id) {
          switch (action) {
            case 'start':
              el.start = event.target.value
              break;
            case 'end':
              el.end = event.target.value
              break;
            default:
              el.manual = event.target.value
          }
        }

        return el;
      });
    })
  }

  const calculateTime = () => {
    // Convert times to Date objects
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const lunStart = new Date(`1970-01-01T${lunchStart}:00`);
    const lunEnd = new Date(`1970-01-01T${lunchEnd}:00`);

    // Calculate total time worked
    const totalTime = end - start; // Total time worked in milliseconds

    // Calculate lunch time duration
    let lunTime = lunEnd - lunStart; // Lunch duration in milliseconds

    // If manual is provided, adjust the time
    if (lunchManual) {
      let [manualHours, manualMinutes] = lunchManual.split(':').map(Number);
      lunTime = (manualHours * 60 + manualMinutes) * 60 * 1000; // Convert to milliseconds
    }

    // Initialize total working time with the total time minus lunch time
    let totalWorkingTime = totalTime - lunTime;
    let breakTime = 0;

    // Calculate break times
    breaks.forEach((el) => {
      const breakStart = new Date(`1970-01-01T${el.start}:00`);
      const breakEnd = new Date(`1970-01-01T${el.end}:00`);
      let breakDuration = breakEnd - breakStart; // Break duration in milliseconds

      // If manual is provided, adjust the time
      if (el.manual) {
        let [manualHours, manualMinutes] = el.manual.split(':').map(Number);
        const breakTime = (manualHours * 60 + manualMinutes) * 60 * 1000; // Convert to milliseconds
        if (breakTime > 0) {
          breakDuration = breakTime;
        }
      }

      breakTime += breakDuration; // Accumulate break durations
      totalWorkingTime -= breakDuration; // Deduct breaks from working time
    });

    // Convert milliseconds to hours
    totalWorkingTime /= (1000 * 60 * 60);
    const totalHours = totalTime / (1000 * 60 * 60);
    breakTime /= (1000 * 60 * 60); // Convert break time to hours
    const lunchDuration = lunTime / (1000 * 60 * 60); // Convert lunch time to hours

    updateFooter({
      start: start.toLocaleTimeString([], { timeStyle: 'short' }),
      lunch: formatTime(lunchDuration),
      break: formatTime(breakTime),
      working: formatTime(totalWorkingTime),
      total: formatTime(totalHours)
    })

    if (totalWorkingTime < 8) {
      setDifference(formatTime(8 - totalWorkingTime))
    }
  }

  useEffect(() => {
    autoGrow(textAreaRef)
    autoGrow(textAreaFooterRef)
  }, [textAreaRef, textAreaFooterRef]);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 1000);
    }
  }, [copied])

  useEffect(() => {
    setEndTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
  }, [])

  return (
    <>
      <section className="flex gap-3 p-5">
        <div className="w-full p-4 bg-[#35363e] text-white rounded-lg shadow">
          <div className="flex items-center">
            <h2 className="text-xl mr-3">Timing</h2>
            <Timer size="20" />
          </div>
          <form className="p-2">
            <div className="mt-3">
              <label className="block mb-2 text-sm font-medium">Start Time</label>
              <input
                type="time"
                className="rounded bg-[#5c5c61] text-white/70 leading-none w-full text-sm p-2.5"
                defaultValue={startTime}
                autoFocus="true"
                onChange={(event) => setStartTime(event.target.value)}
              />
            </div>
            <div className="mt-3 flex gap-3">
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium">Lunch Start</label>
                <input
                  type="time"
                  className="rounded bg-[#5c5c61] text-white/70 leading-none w-full text-sm p-2.5"
                  defaultValue={lunchStart}
                  onChange={(event) => setLunchStart(event.target.value)}
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium">Lunch End</label>
                <input
                  type="time"
                  className="rounded bg-[#5c5c61] text-white/70 leading-none w-full text-sm p-2.5"
                  defaultValue={lunchEnd}
                  onChange={(event) => setLunchEnd(event.target.value)}
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium">Manual</label>
                <input
                  type="time"
                  className="rounded bg-[#5c5c61] text-white/70 leading-none w-full text-sm p-2.5"
                  defaultValue={lunchManual}
                  onChange={(event) => setLunchManual(event.target.value)}
                />
              </div>
            </div>
            <div className="mt-3">
              <button
                type="button"
                className="flex items-center p-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
                onClick={addBreak}
              >
                <Plus color="#111827" />
                Break
              </button>
            </div>
            {breaks.map((el) => (
              <div className="mt-3 flex gap-3 px-3 items-center" key={el.id}>
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium">Start</label>
                  <input
                    type="time"
                    className="rounded bg-[#5c5c61] text-white/70 leading-none w-full text-sm p-2.5"
                    defaultValue={el.start}
                    onChange={(event) => changeBreak(event, el.id, 'start')}
                  />
                </div>
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium">End</label>
                  <input
                    type="time"
                    className="rounded bg-[#5c5c61] text-white/70 leading-none w-full text-sm p-2.5"
                    defaultValue={el.end}
                    onChange={(event) => changeBreak(event, el.id, 'end')}
                  />
                </div>
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium">Manual</label>
                  <input
                    type="time"
                    className="rounded bg-[#5c5c61] text-white/70 leading-none w-full text-sm p-2.5"
                    defaultValue={el.manual}
                    onChange={(event) => changeBreak(event, el.id, 'manual')}
                  />
                </div>
                <div className="mt-6 cursor-pointer" onClick={() => removeBreak(el.id)}>
                  <Cross size="24" />
                </div>
              </div>
            ))}
            <div className="mt-3">
              <label className="block mb-2 text-sm font-medium">End Time</label>
              <input
                type="time"
                className="rounded bg-[#5c5c61] text-white/70 leading-none w-full text-sm p-2.5"
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
              />
            </div>
            <div className="mt-6">
              <button
                type="button"
                className="w-full p-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
                onClick={calculateTime}
              >
                Calculate
              </button>
            </div>
          </form>
          {difference && (
            <div className="p-4 mt-3 mb-4 text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800" role="alert">
              <div className="flex items-center">
                <svg className="flex-shrink-0 w-4 h-4 me-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <h3 className="text-lg font-medium">This is a warning alert</h3>
                <span className="ml-auto cursor-pointer" onClick={() => setDifference(null)}>
                  <Cross size={18} />
                </span>
              </div>
              <div className="mt-2 mb-4 text-sm">
                You still need to complete an additional <strong>{difference}</strong> hours to meet your daily working hours.
              </div>
            </div>
          )}
        </div>
        <div className="w-full p-4 bg-[#35363e] text-white rounded-lg shadow">
          <div className="flex items-center">
            <h2 className="text-xl mr-3">Daily Report</h2>
            {copied ? <Check /> : <Copy onClick={copyAction} />}
          </div>
          <div className="p-2 mt-2">
            <textarea
              ref={textAreaRef}
              className="bg-[#5c5c61] text-white/70 rounded p-2 border-none resize-none text-base h-full w-full focus:outline-none"
              value={template}
              onInput={(event) => {
                autoGrow(textAreaRef);
                setTemplate(event.target.value);
              }}
            ></textarea>
          </div>
          <div className="p-2 mt-2">
            <textarea
              ref={textAreaFooterRef}
              className="bg-[#5c5c61] text-white/70 rounded p-2 border-none resize-none text-base h-full w-full focus:outline-none"
              value={footer}
              onInput={(event) => {
                autoGrow(textAreaFooterRef);
                setFooter(event.target.value);
              }}
            ></textarea>
          </div>
        </div>
      </section>
    </>
  );
};

export default TimerPage;
