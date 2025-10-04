import React, { useState, useEffect } from "react";
import { useStoreContext } from "../../contextApi/ContextApi";
import { useForm } from "react-hook-form";
import TextField from "../TextField";
import Tooltip from "@mui/material/Tooltip";
import { RxCross2 } from "react-icons/rx";
import api from "../../api/api";
import toast from "react-hot-toast";

const CreateNewShorten = ({ setOpen, refetch }) => {
  const { token } = useStoreContext();

  const [loading, setLoading] = useState(false);
  const [rateLimit, setRateLimit] = useState({
    limit: null,
    remaining: null,
    reset: null,
  });
  const [resetCountdown, setResetCountdown] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      originalUrl: "",
    },
    mode: "onTouched",
  });

  // Countdown logic for rate limit reset
  useEffect(() => {
    let interval;
    if (rateLimit.reset) {
      const updateCountdown = () => {
        const secondsLeft = Math.max(0, Math.floor(rateLimit.reset - Date.now() / 1000));
        setResetCountdown(secondsLeft);
      };
      updateCountdown();
      interval = setInterval(updateCountdown, 1000);
    }
    return () => interval && clearInterval(interval);
  }, [rateLimit.reset]);

  // Log rateLimit whenever it changes
  // useEffect(() => {
  //   console.log('Rate Limit Updated:', rateLimit);
  // }, [rateLimit]);

  const createShortUrlHandler = async (data) => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await api.post("/api/urls/shorten", data, { validateStatus: () => true });

      // Fixed: Use lowercase header keys
      const newRateLimit = {
        limit: response.headers["x-ratelimit-limit"] || null,
        remaining: response.headers["x-ratelimit-remaining"] || null,
        reset: response.headers["x-ratelimit-reset"]
          ? Number(response.headers["x-ratelimit-reset"])
          : null,
      };
      
      setRateLimit(newRateLimit);

      if (response.status === 429) {
        setErrorMsg(response.data.error || "Rate limit exceeded. Try again later.");
        return;
      }

      const shortenUrl = `${import.meta.env.VITE_REACT_FRONT_END_URL}/u/${response.data.shortUrl}`;
      navigator.clipboard.writeText(shortenUrl).then(() => {
        toast.success("Shorten Url copied to clipboard", {
          position: "bottom-center",
          className: "mb-5",
          duration: 3000,
        });
      });
      setSuccessMsg("Shorten URL created and copied!");
      reset();
      if (refetch) refetch();
    } catch (error) {
      setErrorMsg("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-white rounded-md">
      <form
        onSubmit={handleSubmit(createShortUrlHandler)}
        className="sm:w-[450px] w-[360px] relative shadow-custom pt-8 pb-5 sm:px-8 px-4 rounded-lg"
      >
        <h1 className="font-montserrat sm:mt-0 mt-3 text-center font-bold sm:text-2xl text-[22px] text-slate-800">
          Create New Shorten Url
        </h1>

        <hr className="mt-2 sm:mb-5 mb-3 text-slate-950" />

        <div>
          <TextField
            label="Enter URL"
            required
            id="originalUrl"
            placeholder="https://example.com"
            type="url"
            message="Url is required"
            register={register}
            errors={errors}
          />
        </div>

        <button
          className={`bg-customRed font-semibold text-white w-32 bg-custom-gradient py-2 transition-colors rounded-md my-3 
          ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
          type="submit"
          disabled={loading || rateLimit.remaining === 0}
        >
          {loading ? "Loading..." : "Create"}
        </button>

        {(rateLimit.limit || rateLimit.remaining !== null || rateLimit.reset) && (
          <div className="mt-3 text-sm text-slate-700 bg-slate-100 py-2 px-3 rounded flex flex-col items-center">
            <div>Rate Limit: {rateLimit.limit ?? "--"}</div>
            <div>
              Remaining:{" "}
              <span className={rateLimit.remaining === 0 ? "text-red-600 font-bold" : ""}>
                {rateLimit.remaining ?? "--"}
              </span>
            </div>
            <div>
              Reset In: {rateLimit.reset ? `${resetCountdown ?? "--"}s` : "--"}
            </div>
          </div>
        )}

        {successMsg && (
          <div className="mt-2 text-green-600 text-sm text-center">{successMsg}</div>
        )}
        {errorMsg && (
          <div className="mt-2 text-red-600 text-sm text-center">{errorMsg}</div>
        )}

        {!loading && (
          <Tooltip title="Close">
            <button
              disabled={loading}
              onClick={() => setOpen(false)}
              className="absolute right-2 top-2"
              type="button"
            >
              <RxCross2 className="text-slate-800 text-3xl" />
            </button>
          </Tooltip>
        )}
      </form>
    </div>
  );
};

export default CreateNewShorten;
