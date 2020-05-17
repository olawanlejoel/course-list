//Course Class : Represents a Course

class Course {
	constructor(code, title, unit){
		this.code = code;
		this.title = title;
		this.unit = unit;
	}

}

// Ui Class: Handle UI Tasks

class UI {
	static displayCourses() {
		

		const courses = Store.getCourses();

		//loop through all the books and call a function addCourseToList
		courses.forEach((course) => UI.addCourseToList(course));
	} 

	static addCourseToList(course) {
		const list = document.querySelector('#course-list');

		const row = document.createElement('tr');

		row.innerHTML = `	
			<td>${course.code}</td>
			<td>${course.title}</td>
			<td>${course.unit}</td>
			<td><a href="#" class="close delete">X</a></td>
		`;

		list.appendChild(row);
	}

	static deleteCourse(el) {
		if (el.classList.contains('delete')) {
			el.parentElement.parentElement.remove();
		}
	}

	static clearFields() {
		document.querySelector('#code').value = '';
		document.querySelector('#title').value = '';
		document.querySelector('#unit').value = '';
	}

	
}


//Store Class : Handles Storage
class Store {
	static getCourses() {
		let courses;
		if (localStorage.getItem('courses') === null) {
			courses = [];
		}else{
			courses = JSON.parse(localStorage.getItem('courses'));
		}

		return courses;
	}

	static addCourse(course) {
		const courses = Store.getCourses();

		courses.push(course);

		localStorage.setItem('courses', JSON.stringify(courses));
	}

	static removeCourse(code) {
		const courses = Store.getCourses();

		courses.forEach((course, index) => {
			if(courses.code === code){
				courses.splice(index, 1);
			}
		});

		localStorage.setItem('courses', JSON.stringify(courses));
	}
}

//Event : Display Books
document.addEventListener('DOMContentLoaded', UI.displayCourses);

//Event : Add a book
document.querySelector('#course-form').addEventListener('submit', (e) => {
	//prevent actual submit
	e.preventDefault();

	//Get form Values
	const code = document.querySelector('#code').value;
	const title = document.querySelector('#title').value;
	const unit = document.querySelector('#unit').value;

	//validate
	if (code === '' || title === '' || unit === '') {
		alert('please fill in all fields')
	}else{
		// Instantiated book
		const course = new Course(code, title, unit);

		//Add course to Ui
		UI.addCourseToList(course);

		//Add course to store
		Store.addCourse(course);

		// clear fields
		UI.clearFields();
	}

	
});

//Event : Remove a Book
document.querySelector('#course-list').addEventListener('click', (e) =>{
	//Remove book from UI
	UI.deleteCourse(e.target);

	//Remove book from store
	Store.removeCourse
	(e.target.parentElement.previousElementSibling.textContent);
})