"use strict";
const list = document.querySelector("#tasks");
const form = document.querySelector("#add");
const input = document.querySelector("#title");
const count = document.querySelector("#count");
async function api(path, init) {
    const res = await fetch(`/api/tasks${path}`, {
        headers: { "Content-Type": "application/json" },
        ...init,
    });
    if (!res.ok)
        throw new Error(`Request failed: ${res.status}`);
    return res.status === 204 ? undefined : res.json();
}
function render(tasks) {
    list.replaceChildren(...tasks.map((t) => {
        const li = document.createElement("li");
        li.className = t.done ? "done" : "";
        const label = document.createElement("label");
        const box = document.createElement("input");
        box.type = "checkbox";
        box.checked = t.done;
        box.onchange = async () => { await api(`/${t.id}`, { method: "PATCH" }); load(); };
        label.append(box, document.createTextNode(t.title));
        const del = document.createElement("button");
        del.textContent = "Delete";
        del.onclick = async () => { await api(`/${t.id}`, { method: "DELETE" }); load(); };
        li.append(label, del);
        return li;
    }));
    const open = tasks.filter((t) => !t.done).length;
    count.textContent = tasks.length ? `${open} of ${tasks.length} open` : "Nothing here yet. Add your first task above.";
}
async function load() {
    render(await api(""));
}
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = input.value.trim();
    if (!title)
        return;
    await api("", { method: "POST", body: JSON.stringify({ title }) });
    input.value = "";
    load();
});
load();
