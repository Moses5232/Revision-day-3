let items = [];
    let displayedItems = [];

    const itemName = document.getElementById("itemName");
    const itemValue = document.getElementById("itemValue");
    const itemList = document.getElementById("itemList");

    function addItem() {

      const name = itemName.value.trim();
      const value = Number(itemValue.value);

      if (name === "" || itemValue.value === "") {
        alert("Please enter both the item name and value.");
        return;
      }

      const item = {
        name: name,
        value: value
      };

      items.push(item);

      itemName.value = "";
      itemValue.value = "";

      showAll();
    }

    function showAll() {
      displayedItems = [...items];
      display();
    }

    function filterHigh() {
      displayedItems = items.filter(item => item.value > 50);
      display();
    }

    function sortByValue() {
      displayedItems = [...items].sort((a, b) => b.value - a.value);
      display();
    }

    function display() {

      if (displayedItems.length === 0) {
        itemList.innerHTML = "No items to display.";
      } else {

        let html = "";

        displayedItems.forEach(item => {
          html += `
            <div class="item">
              ${item.name} - R${item.value}
            </div>
          `;
        });

        itemList.innerHTML = html;
      }

      updateStats();
    }

    function updateStats() {

      const totalItems = items.length;

      const totalValue = items.reduce((sum, item) => sum + item.value, 0);

      const average =
        totalItems === 0 ? 0 : (totalValue / totalItems).toFixed(2);

      const highest = items.reduce(
        (max, item) => item.value > max ? item.value : max,
        0
      );

      document.getElementById("total").textContent = totalItems;
      document.getElementById("totalVal").textContent = totalValue;
      document.getElementById("avgVal").textContent = average;
      document.getElementById("maxVal").textContent = highest;
    }

    function clearAll() {

      items = [];
      displayedItems = [];

      display();
    }

    document.getElementById("addBtn").addEventListener("click", addItem);
    document.getElementById("clearBtn").addEventListener("click", clearAll);
    document.getElementById("filterHighBtn").addEventListener("click", filterHigh);
    document.getElementById("sortBtn").addEventListener("click", sortByValue);
    document.getElementById("showAllBtn").addEventListener("click", showAll);

    showAll();