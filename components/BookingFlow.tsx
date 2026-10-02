"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const REASONS = ["Consultation", "Referral System", "Web Development"];

function toSAST(isoTime: string): string {
  return new Date(isoTime).toLocaleTimeString("en-ZA", {
    timeZone: "Africa/Johannesburg",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function buildCalendarCells(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = (firstDay.getDay() + 6) % 7; // Mon=0
  const total = Math.ceil((startOffset + daysInMonth) / 7) * 7;
  return Array.from({ length: total }, (_, i) => {
    const day = i - startOffset + 1;
    return day >= 1 && day <= daysInMonth ? day : null;
  });
}

function toDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

interface CalSlotEntry {
  time: string;
}

interface CalSlotsResponse {
  data?: {
    slots?: Record<string, CalSlotEntry[]>;
  };
}

interface FormState {
  name: string;
  email: string;
  reason: string;
  notes: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  reason?: string;
}

export default function BookingFlow() {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();
  const todayKey = toDateKey(todayYear, todayMonth, todayDate);

  const [viewYear, setViewYear] = useState(todayYear);
  const [viewMonth, setViewMonth] = useState(todayMonth);
  const [slots, setSlots] = useState<Record<string, string[]>>({});
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    reason: "",
    notes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [booked, setBooked] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const fetchSlots = useCallback(async (year: number, month: number) => {
    setLoadingSlots(true);
    const start = new Date(year, month, 1).toISOString();
    const end = new Date(year, month + 1, 0, 23, 59, 59).toISOString();
    try {
      const res = await fetch(`/api/slots?start=${start}&end=${end}`);
      const data = (await res.json()) as CalSlotsResponse;
      const rawSlots = data?.data?.slots ?? {};
      const mapped: Record<string, string[]> = {};
      for (const [date, times] of Object.entries(rawSlots)) {
        mapped[date] = times.map((t) => t.time);
      }
      setSlots((prev) => ({ ...prev, ...mapped }));
    } catch {
      // slots remain empty for this month
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    void fetchSlots(viewYear, viewMonth);
  }, [viewYear, viewMonth, fetchSlots]);

  function prevMonth() {
    setSelectedDate(null);
    setSelectedTime(null);
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    setSelectedDate(null);
    setSelectedTime(null);
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  function isDayAvailable(year: number, month: number, day: number): boolean {
    const d = new Date(year, month, day);
    const todayStart = new Date(todayYear, todayMonth, todayDate);
    if (d < todayStart) return false;
    const key = toDateKey(year, month, day);
    return (slots[key]?.length ?? 0) > 0;
  }

  function selectDate(dateKey: string) {
    setSelectedDate(dateKey);
    setSelectedTime(null);
    setErrors({});
    setBookingError(null);
  }

  function selectTime(time: string) {
    setSelectedTime(time);
    setErrors({});
    setBookingError(null);
  }

  function validate(): boolean {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address";
    if (!form.reason) e.reason = "Please select a reason";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate() || !selectedTime) return;
    setSubmitting(true);
    setBookingError(null);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ start: selectedTime, ...form }),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (data.ok) {
        setBooked(true);
      } else {
        setBookingError(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setBookingError("Could not connect. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // Confirmation state
  if (booked && selectedDate && selectedTime) {
    return (
      <div className="flex flex-col gap-6">
        <h2 className="text-[2.5rem] font-medium tracking-[-0.02em] text-foundry-ink leading-[1.1]">
          You&rsquo;re booked in.
        </h2>
        <p className="text-foundry-stone text-lg leading-relaxed">
          {formatDate(selectedDate)} at {toSAST(selectedTime)} SAST.
          <br />
          A confirmation email is on its way.
        </p>
        <Link
          href="/"
          className="text-foundry-ink text-sm font-medium hover:text-foundry-stone transition-colors duration-200 self-start mt-2"
        >
          ← Back to home
        </Link>
      </div>
    );
  }

  const cells = buildCalendarCells(viewYear, viewMonth);
  const timeSlotsForDate = selectedDate ? (slots[selectedDate] ?? []) : [];

  return (
    <div className="flex flex-col gap-10">
      {/* Calendar */}
      <div>
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevMonth}
            className="text-foundry-stone hover:text-foundry-ink transition-colors duration-200 px-1 py-0.5 text-lg leading-none"
            aria-label="Previous month"
          >
            ←
          </button>
          <span className="text-foundry-ink font-medium text-base">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </span>
          <button
            onClick={nextMonth}
            className="text-foundry-stone hover:text-foundry-ink transition-colors duration-200 px-1 py-0.5 text-lg leading-none"
            aria-label="Next month"
          >
            →
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {DAY_LABELS.map((label) => (
            <div
              key={label}
              className="text-center text-foundry-stone text-xs font-medium py-2"
            >
              {label}
            </div>
          ))}
        </div>

        {/* Grid */}
        {loadingSlots ? (
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }).map((_, i) => (
              <div
                key={i}
                className="h-10 rounded-[6px] bg-foundry-mist animate-pulse"
              />
            ))}
          </div>
        ) : Object.keys(slots).length === 0 ? (
          <div className="pt-4 pb-2">
            <p className="text-foundry-stone text-sm leading-relaxed">
              Live calendar coming soon. In the meantime,{" "}
              <a
                href="/contact"
                className="text-foundry-ink underline underline-offset-4 decoration-foundry-mist hover:decoration-foundry-ink transition-colors duration-200"
              >
                contact us
              </a>{" "}
              and we&rsquo;ll get back to you within a few hours.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (day === null) return <div key={i} />;

              const dateKey = toDateKey(viewYear, viewMonth, day);
              const available = isDayAvailable(viewYear, viewMonth, day);
              const selected = selectedDate === dateKey;
              const isToday = dateKey === todayKey;

              return (
                <button
                  key={i}
                  disabled={!available}
                  onClick={() => available && selectDate(dateKey)}
                  className={[
                    "h-10 w-full rounded-[6px] text-sm transition-colors duration-200 relative",
                    selected
                      ? "bg-foundry-ochre text-white font-medium"
                      : available
                        ? "text-foundry-ink hover:bg-foundry-cream cursor-pointer"
                        : "text-foundry-stone cursor-default",
                  ].join(" ")}
                >
                  {day}
                  {isToday && !selected && (
                    <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-foundry-ochre" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Time slots */}
      {selectedDate && timeSlotsForDate.length > 0 && (
        <div>
          <div className="flex items-baseline gap-2 mb-4">
            <h3 className="text-foundry-ink font-medium text-sm">
              {formatDate(selectedDate)}
            </h3>
            <span className="text-foundry-stone text-xs">· SAST</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {timeSlotsForDate.map((time) => {
              const isSelected = selectedTime === time;
              return (
                <button
                  key={time}
                  onClick={() => selectTime(time)}
                  className={[
                    "py-2.5 rounded-[6px] text-sm border transition-colors duration-200",
                    isSelected
                      ? "bg-foundry-ochre border-foundry-ochre text-white font-medium"
                      : "border-foundry-mist text-foundry-stone hover:border-foundry-ink hover:text-foundry-ink",
                  ].join(" ")}
                >
                  {toSAST(time)}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Details form */}
      {selectedTime && (
        <form
          onSubmit={(e) => void handleSubmit(e)}
          className="flex flex-col gap-5"
          noValidate
        >
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-foundry-ink text-sm font-medium"
              htmlFor="bf-name"
            >
              Name
            </label>
            <input
              id="bf-name"
              type="text"
              required
              value={form.name}
              onChange={(e) =>
                setForm((f) => ({ ...f, name: e.target.value }))
              }
              placeholder="Your name"
              className={[
                "w-full px-4 py-3 rounded-[6px] border text-foundry-ink text-sm bg-foundry-white outline-none transition-colors duration-200 placeholder:text-foundry-stone focus:border-foundry-ink",
                errors.name ? "border-foundry-ochre" : "border-foundry-mist",
              ].join(" ")}
            />
            {errors.name && (
              <p className="text-foundry-stone text-xs">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-foundry-ink text-sm font-medium"
              htmlFor="bf-email"
            >
              Email
            </label>
            <input
              id="bf-email"
              type="email"
              required
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              placeholder="you@example.com"
              className={[
                "w-full px-4 py-3 rounded-[6px] border text-foundry-ink text-sm bg-foundry-white outline-none transition-colors duration-200 placeholder:text-foundry-stone focus:border-foundry-ink",
                errors.email ? "border-foundry-ochre" : "border-foundry-mist",
              ].join(" ")}
            />
            {errors.email && (
              <p className="text-foundry-stone text-xs">{errors.email}</p>
            )}
          </div>

          {/* Reason */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-foundry-ink text-sm font-medium"
              htmlFor="bf-reason"
            >
              What are you interested in?
            </label>
            <select
              id="bf-reason"
              required
              value={form.reason}
              onChange={(e) =>
                setForm((f) => ({ ...f, reason: e.target.value }))
              }
              className={[
                "w-full px-4 py-3 rounded-[6px] border text-foundry-ink text-sm bg-foundry-white outline-none transition-colors duration-200 cursor-pointer",
                !form.reason ? "text-foundry-stone" : "",
                errors.reason
                  ? "border-foundry-ochre"
                  : "border-foundry-mist focus:border-foundry-ink",
              ].join(" ")}
            >
              <option value="" disabled>
                Select a reason
              </option>
              {REASONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            {errors.reason && (
              <p className="text-foundry-stone text-xs">{errors.reason}</p>
            )}
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-foundry-ink text-sm font-medium"
              htmlFor="bf-notes"
            >
              Notes{" "}
              <span className="text-foundry-stone font-normal">(optional)</span>
            </label>
            <textarea
              id="bf-notes"
              rows={3}
              value={form.notes}
              onChange={(e) =>
                setForm((f) => ({ ...f, notes: e.target.value }))
              }
              placeholder="Anything useful for me to know beforehand?"
              className="w-full px-4 py-3 rounded-[6px] border border-foundry-mist text-foundry-ink text-sm bg-foundry-white outline-none transition-colors duration-200 placeholder:text-foundry-stone focus:border-foundry-ink resize-none"
            />
          </div>

          {bookingError && (
            <p className="text-foundry-stone text-sm">{bookingError}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center bg-foundry-ochre text-white font-medium px-6 py-3.5 rounded-[6px] hover:bg-foundry-ochre-hover active:bg-foundry-ochre-active transition-colors duration-200 disabled:opacity-60 self-start"
          >
            {submitting ? "Booking..." : "Book call"}
          </button>
        </form>
      )}
    </div>
  );
}
