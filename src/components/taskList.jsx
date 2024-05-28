import React, { useState, useEffect } from "react";

export default function TaskList() {
  const [notes, setNotes] = useState(() => {
    // Cargar las notas del localStorage al inicio
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [titleTask, setTitleTask] = useState("");

  useEffect(() => {
    // Guardar las notas en el localStorage cada vez que cambian
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function createNewNote() {
    if (titleTask.trim() !== "") {
      setNotes((prevNotes) => [
        ...prevNotes,
        {
          id: Date.now(),
          title: titleTask,
          taskList: [],
          newTask: "",
        },
      ]);

      setTitleTask("");
    }
  }

  function deleteNote(noteId) {
    setNotes(notes.filter((note) => note.id !== noteId));
  }

  function saveTaskInformation(noteId) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId && note.newTask.trim() !== ""
          ? {
              ...note,
              taskList: [...note.taskList, { text: note.newTask, checked: false }],
              newTask: "",
            }
          : note
      )
    );
  }

  function deleteTask(noteId, taskToDelete) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              taskList: note.taskList.filter((task) => task.text !== taskToDelete),
            }
          : note
      )
    );
  }

  function handleTaskInput(noteId, value) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, newTask: value } : note
      )
    );
  }

  function toggleTaskChecked(noteId, taskText) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              taskList: note.taskList.map((task) =>
                task.text === taskText
                  ? { ...task, checked: !task.checked }
                  : task
              ),
            }
          : note
      )
    );
  }

  return (
    <>
      <div className="div">
        {notes.map((note) => (
          <div key={note.id}>
            <div className="div-note">
              <form className="form-note" onSubmit={(e) => e.preventDefault()}>
                <input
                  className="input-note"
                  type="text"
                  value={note.title}
                  placeholder="Introduce the title of the list..."
                  onChange={(e) =>
                    setNotes((prevNotes) =>
                      prevNotes.map((n) =>
                        n.id === note.id ? { ...n, title: e.target.value } : n
                      )
                    )
                  }
                />
                <button
                  className="button-note"
                  onClick={() => deleteNote(note.id)}
                >
                  <span>
                    Delete Note
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      viewBox="0 -960 960 960"
                      width="20"
                    >
                      <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
                    </svg>
                  </span>
                </button>
              </form>

              <form
                className="form-note"
                onSubmit={(e) => {
                  e.preventDefault();
                  saveTaskInformation(note.id);
                }}
              >
                <input
                  className="input-note"
                  type="text"
                  value={note.newTask}
                  placeholder="Introduce the task..."
                  onChange={(e) => handleTaskInput(note.id, e.target.value)}
                />
                <button className="button-note" type="submit">
                  <span>
                    Add task
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      viewBox="0 -960 960 960"
                      width="20"
                    >
                      <path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z" />
                    </svg>
                  </span>
                </button>
              </form>

              <div>
                {note.taskList.map((task, index) => (
                  <div key={index} className="div-note-task">
                    <form className="form-task" onSubmit={(e) => e.preventDefault()}>
                      <input
                        type="checkbox"
                        name="task"
                        checked={task.checked}
                        onChange={() => toggleTaskChecked(note.id, task.text)}
                        className="input-task"
                      />
                      <div className="div-form-task ">
                        <label>{task.text}</label>
                        <button
                            className="button-task"
                            onClick={() => deleteTask(note.id, task.text)}
                        >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="25px"
                            viewBox="0 -960 960 960"
                            width="25px"
                            fill="#5f6368"
                            >
                            <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
                            </svg>
                        </button>
                      </div>
                    </form>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div>
          <div className="div-title-task">
            <form
              className="form-title-list"
              onSubmit={(e) => {
                e.preventDefault();
                createNewNote();
              }}
            >
              <input
                id="task"
                className="input-note"
                type="text"
                value={titleTask}
                placeholder="Introduce the title of the list..."
                onChange={(e) => setTitleTask(e.target.value)}
              />
              <button
                type="button"
                className="button-add-list"
                onClick={createNewNote}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 -960 960 960"
                    width="20"
                  >
                    <path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z" />
                  </svg>
                  <span>Add New Note</span>
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
