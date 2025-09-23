
/*
// Mostrar el año actual

const currentYear = new Date().getFullYear();
document.querySelector('#currentyear').textContent = currentYear;

// Mostrar la fecha de última modificación
document.querySelector('#lastModified').textContent = document.lastModified;

// Ejemplo de array de cursos (puedes completarlo)
const courses = [
  { name: "WDD131", credits: 3, completed: true, type: "WDD" },
  { name: "CSE110", credits: 3, completed: false, type: "CSE" }
];

const courseContainer = document.querySelector('#course-container');

function displayCourses(filter = "All") {
  courseContainer.innerHTML = "";
  let filteredCourses = courses;
  if(filter !== "All") {
    filteredCourses = courses.filter(c => c.type === filter);
  }
  filteredCourses.forEach(course => {
    const div = document.createElement('div');
    div.textContent = `${course.name} (${course.credits} credits)`;
    if(course.completed) div.style.fontWeight = "bold";
    courseContainer.appendChild(div);
  });
}

// Mostrar todos por defecto
displayCourses();
*/

const courses = [
  { code: "WDD 130", category: "WDD", credits: 2 },
  { code: "WDD 131", category: "WDD", credits: 2 },
  { code: "WDD 231", category: "WDD", credits: 2 },
  { code: "CSE 110", category: "CSE", credits: 2 },
  { code: "CSE 210", category: "CSE", credits: 2 },
];

const courseList = document.getElementById("course-list");
const totalCredits = document.getElementById("total-credits");
const filterButtons = document.querySelectorAll(".filters button");

function displayCourses(filter) {
  courseList.innerHTML = "";
  let filtered = courses;

  if (filter !== "All") {
    filtered = courses.filter(course => course.category === filter);
  }

  let credits = 0;

  filtered.forEach(course => {
    const li = document.createElement("li");
    li.textContent = course.code;
    courseList.appendChild(li);
    credits += course.credits;
  });

  totalCredits.textContent = `The total credits for course listed above is ${credits}`;
}

// Event listeners
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    displayCourses(button.dataset.filter);
  });
});

// Default load
displayCourses("All");