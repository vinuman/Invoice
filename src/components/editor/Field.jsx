import PropTypes from "prop-types";

export function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-gray-700">{label}</span>
      {children}
    </label>
  );
}

export function TextInput(props) {
  return (
    <input
      {...props}
      className={[
        "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900",
        "placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200",
        props.className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

export function TextArea(props) {
  return (
    <textarea
      {...props}
      className={[
        "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900",
        "placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200",
        props.className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

export function Select(props) {
  return (
    <select
      {...props}
      className={[
        "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900",
        "focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200",
        props.className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
};

TextInput.propTypes = {
  className: PropTypes.string,
};

TextArea.propTypes = {
  className: PropTypes.string,
};

Select.propTypes = {
  className: PropTypes.string,
};

