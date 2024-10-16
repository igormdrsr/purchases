import { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([
    {
      id: crypto.randomUUID(),
      title: "Garlic",
      completed: true,
      demo: true,
    },
    {
      id: crypto.randomUUID(),
      title: "Watermelon",
      completed: false,
      demo: false,
    },
  ]);

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!inputValue.trim()) return;

    setItems((previous) => {
      return [
        ...previous,
        {
          id: crypto.randomUUID(),
          title: inputValue,
          completed: false,
        },
      ];
    });

    setInputValue("");
  }

  function handleItemClick(clickedItem) {
    setItems(previous => {
      const updatedItems = previous.map(item => {
        if(item.id === clickedItem.id) {
          return {
            ...item,
            completed: !item.completed
          }
        }
        
        return item;
      })

      return updatedItems;
    })
  }

  return (
    <>
      <header>
        <h1 className="text-4xl font-bold tracking-tighter text-blue-600 text-center py-4">
          My Purchases
        </h1>
      </header>
      <main className="p-2">
        <form onSubmit={handleSubmit} className="flex gap-1">
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            autoFocus
            required
            placeholder="Add something..."
            className="border-2 border-[lightgrey] rounded grow px-1 focus:outline-blue-600"
          />
          <button className="bg-blue-600 px-4 py-2 text-white font-semibold text-sm rounded">
            Add
          </button>
        </form>
        <ol className="mt-2 flex flex-col gap-1 bg-gray-200 p-2 rounded">
          {items.map((item) => {
            return (
              <li
                key={item.id}
                className={`${
                  item.completed ? "bg-blue-600 text-white" : "bg-white"
                } p-2 rounded cursor-pointer transition-colors`}
                onClick={() => handleItemClick(item)}
              >
                {item.title}
                {"demo" in item && (
                  <span
                    className={`ml-1 text-xs rounded font-semibold p-1 ${
                      item.completed
                        ? "bg-white text-blue-600"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    EXAMPLE
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </main>
    </>
  );
}

export { App };
