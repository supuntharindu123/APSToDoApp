// SuccessAlert: Displays a success message in a styled alert box
function SuccessAlert({ message }) {
  return (
    <div className="mb-2 px-4 py-2 rounded bg-green-500 text-white text-center font-semibold animate-fade-in md:w-lg">
      {message}
    </div>
  );
}

export default SuccessAlert;
