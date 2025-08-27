// ErrorAlert: Displays an error message in a styled alert box
function ErrorAlert({ message }) {
  return (
    <div className="md:w-lg mb-2 px-4 py-2 rounded bg-red-500 text-white text-center font-semibold animate-fade-in">
      {message}
    </div>
  );
}

export default ErrorAlert;
