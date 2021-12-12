import { isAuthenticated } from "./api/authentication";

function getNavItems() {
  var items = [{ name: "Search", link: "/" }];

  var user = isAuthenticated().user;

  if (user.role === 2) {
    return items;
  }
  if (user.role === 1) {
    items.push({ name: "Update Shipment", link: "/update-shipment" });
    return items;
  }
  if (user.role === 0) {
    items.push({ name: "Add Product", link: "/add-product" });
    items.push({ name: "Update Shipment", link: "/update-shipment" });
    return items;
  }
}

export default getNavItems;
