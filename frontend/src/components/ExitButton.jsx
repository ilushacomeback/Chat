const ExitButton = ({ handleUseExit }) => {
  return (
    <button onClick={handleUseExit} className="btn btn-primary">
      Выйти
    </button>
  );
};

export default ExitButton
