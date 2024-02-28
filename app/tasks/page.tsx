export default function Tasks() {
  return (
    <div>
      <h1 className="text-2xl">Tasks</h1>
      <div className="flex items-center flex-col">
        <input
          type="text"
          placeholder="Run the tests"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
    </div>
  );
}
