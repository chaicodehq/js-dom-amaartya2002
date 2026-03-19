/**
 * 🍵 Chai Stall Board - getElementById, querySelector, textContent
 *
 * Sharma ji ki chai stall hai station ke bahar. Unka rate board update
 * karna hai digitally. Cutting chai, masala chai, adrak chai - sabki
 * price dynamically change hoti rehti hai. getElementById se specific
 * chai ka price element dhundho, querySelector se stall ka naam dhundho,
 * aur textContent se values read/write karo.
 *
 * DOM Structure expected:
 *   <div class="chai-stall">
 *     <h1 class="stall-name">Sharma Chai Wala</h1>
 *     <div class="price-board">
 *       <p id="price-masala" class="chai-price" data-chai="masala">₹15</p>
 *       <p id="price-cutting" class="chai-price" data-chai="cutting">₹10</p>
 *       <p id="price-adrak" class="chai-price" data-chai="adrak">₹20</p>
 *     </div>
 *   </div>
 *
 * Functions:
 *
 *   1. updateChaiPrice(document, chaiType, newPrice)
 *      - Finds element with id "price-{chaiType}" using getElementById
 *      - Sets its textContent to "₹{newPrice}"
 *      - Returns true if element found and updated, false if not found
 *      - Validation: newPrice must be a number > 0, else return false
 *      - chaiType must be a non-empty string, else return false
 *
 *   2. getChaiPrice(document, chaiType)
 *      - Finds element with id "price-{chaiType}"
 *      - Reads textContent, removes "₹" prefix, parses to number
 *      - Returns the number price
 *      - Agar element not found, return null
 *
 *   3. updateStallName(document, newName)
 *      - Finds ".stall-name" element using querySelector
 *      - Saves old textContent, updates to newName
 *      - Returns old name string
 *      - Agar element not found, return null
 *      - Agar newName not string or empty, return null
 *
 *   4. highlightCheapestChai(document)
 *      - Finds all ".chai-price" elements using querySelectorAll
 *      - Parses each price (remove ₹, parse to number)
 *      - Adds class "cheapest" to the element with lowest price
 *      - Removes class "cheapest" from all other chai-price elements
 *      - Returns the data-chai attribute value of cheapest chai
 *      - Agar no chai-price elements found, return null
 *
 * Hint: document.getElementById("id") se specific element dhundho,
 *   document.querySelector(".class") se first matching element,
 *   document.querySelectorAll(".class") se saare matching elements.
 *
 * @example
 *   updateChaiPrice(document, "masala", 20);
 *   // => true (element with id "price-masala" now shows "₹20")
 *
 *   getChaiPrice(document, "masala");
 *   // => 20
 *
 *   updateStallName(document, "Sharma Premium Chai");
 *   // => "Sharma Chai Wala" (old name returned)
 *
 *   highlightCheapestChai(document);
 *   // => "cutting" (cheapest chai gets "cheapest" class)
 */
export function updateChaiPrice(document, chaiType, newPrice) {
  // Your code here

  if (typeof newPrice !== "number" || newPrice <= 0 || typeof chaiType !== "string" || !chaiType) {
    return false
  }
  //console.log(document);

  const elementToUpdate = document.getElementById(`price-${chaiType}`)

  if (!elementToUpdate) {
    return false
  }

  elementToUpdate.textContent = `₹${newPrice}`

  return true
}

export function getChaiPrice(document, chaiType) {
  // Your code here
  const chaiElement = document.getElementById(`price-${chaiType}`)

  if (!chaiElement) {
    return null
  }

  const chaiPrice = chaiElement.textContent

  return +chaiPrice.replace("₹", "").trim()

}

export function updateStallName(document, newName) {
  // Your code here
  if (typeof newName !== "string" || !newName) {
    return null
  }

  const stallName = document.querySelector(".stall-name")
  if (!stallName) {
    return null
  }

  const oldTextContent = stallName.textContent
  stallName.textContent = newName

  return oldTextContent
}

export function highlightCheapestChai(document) {
  // Your code here

  const allChaiPrices = document.querySelectorAll(".chai-price")
  if (allChaiPrices.length === 0) {
    return null
  }

  let cheapest = Number.MAX_VALUE
  let cheapestElement = null

  allChaiPrices.forEach((chai) => {

    const price = +(chai.textContent.replace("₹", "").trim())

    if (price < cheapest) {
      cheapest = price
      cheapestElement = chai
    }

  })

  if (!cheapestElement) {
    return null
  }

  allChaiPrices.forEach((chai) => {
    chai.classList.remove("cheapest")
  })

  cheapestElement.classList.add("cheapest")

  return cheapestElement.getAttribute("data-chai")
}
