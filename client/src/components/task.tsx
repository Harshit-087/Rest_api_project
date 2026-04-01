export default function CrudTask() {
  return (
    <section className="mt-10 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Task Manager</h2>

      <div className="bg-white shadow-md rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter task title"
            className="flex-1 border rounded-lg px-4 py-2 outline-none"
          />
          <button className="bg-black text-white px-4 py-2 rounded-lg">
            Add Task
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center border rounded-lg p-4">
            <span>Complete backend authentication</span>

            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm border rounded-lg">
                Edit
              </button>
              <button className="px-3 py-1 text-sm border rounded-lg">
                Delete
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center border rounded-lg p-4">
            <span>Build CRUD API endpoints</span>

            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm border rounded-lg">
                Edit
              </button>
              <button className="px-3 py-1 text-sm border rounded-lg">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}