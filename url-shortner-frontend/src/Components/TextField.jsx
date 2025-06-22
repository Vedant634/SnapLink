const TextField = ({
  label,
  id,
  type,
  errors,
  register,
  required,
  message,
  className,
  min,
  value,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor={id}
        className={`${className ? className : ""} font-semibold text-lg text-gray-800`}
      >
        {label}
      </label>

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`${
          className ? className : ""
        } px-4 py-3 border-2 outline-none bg-white text-gray-800 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 ${
          errors[id]?.message 
            ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
            : "border-gray-300"
        }`}
        {...register(id, {
          required: { value: required, message },
          minLength: min
            ? { value: min, message: "Minimum 6 character is required" }
            : null,

          pattern:
            type === "email"
              ? {
                  value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+com+$/,
                  message: "Invalid email",
                }
              : type === "url"
              ? {
                  value:
                    /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                  message: "Please enter a valid url",
                }
              : null,
        })}
      />

      {errors[id]?.message && (
        <p className="text-sm font-medium text-red-600 mt-1 ml-1">
          {errors[id]?.message}*
        </p>
      )}
    </div>
  );
};

export default TextField;