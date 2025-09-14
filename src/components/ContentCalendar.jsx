function ContentCalendar() {
  const handleButtonClick = async () => {
    try {
        const response = await fetch('http://localhost:7860/users/123/profile',
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        const data = await response.json();
        console.log(data);
        alert("Check console for response from backend");
    } catch (error) {
        console.error("Error calling backend route:", error);
        alert("Error calling backend route. Check console for details.");
    }
  };
  
  return (
    <main className="flex-1 p-6">
      <h2 className="text-2xl font-semibold">Welcome to your Content Calendar</h2>
      <p className="text-gray-600 mt-2">
        Select an option from the sidebar to get started. Select an option from the sidebar to get started. Select an option from the sidebar to get started. Select an option from the sidebar to get started. Select an option from the sidebar to get started.
      </p>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={ handleButtonClick }>
        Check if route to users working
      </button>

    </main>
  );
}

export default ContentCalendar;