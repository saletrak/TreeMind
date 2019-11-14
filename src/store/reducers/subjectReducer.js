import axios from 'axios';

const FETCH_SUBJECTS = "FETCH_SUBJECTS";
const SAVE_SUBJECTS = "SAVE_SUBJECTS";

const ADD_SUBJECT = "ADD_SUBJECT";
const UPDATE_SUBJECT = "UPDATE_SUBJECT";
const REMOVE_SUBJECT = "REMOVE_SUBEJCT";

const ADD_SUBJECT_CHILD = "ADD_SUBJECT_CHILD";
const UPDATE_SUBJECT_CHILD = "UPDATE_SUBJECT_CHILD";
const REMOVE_SUBJECT_CHILD = "REMOVE_SUBJECT_CHILD";
const SET_ATTACH_SUBJECT_CHILD = "SET_ATTACH_SUBJECT_CHILD";
const REMOVE_ATTACH_SUBJECT_CHILD = "REMOVE_ATTACH_SUBJECT_CHILD";

function greatestKey(object) {
	let keys = Object.keys(object);
	let greatest = 0;
	keys.map(key => {
		try {
			let number = Number(key);
			greatest = number > greatest ? number : greatest;
		} catch (e) {
		}
	});
	return greatest;
}

const subjectsDefault = {
	1: {
		name: "Subject 1",
		children: {
			1: {
				name: "Child 1",
				desc: "To jest opis pierwszego dziecka\neloooo\nhejjj",
				isDone: true,
				removed: false,
			},
		},
		removed: false,
	},
	2: {
		name: "Subject 1",
		children: {
			1: {
				name: "Child 1",
				desc: "To jest opis pierwszego dziecka\neloooo\nhejjj",
				isDone: true,
				removed: false,
			},
		},
		removed: false,
	},
	3: {
		name: "Subject 1",
		children: {
			1: {
				name: "Child 1",
				desc: "To jest opis pierwszego dziecka\neloooo\nhejjj",
				isDone: true,
				removed: false,
			},
		},
		removed: false,
	},
};


export const fetchSubjects = () => ({
	type: FETCH_SUBJECTS,
	payload: axios.post("http://localhost/treemind/contentLocal.php", "action=fetch")
		.then(response => {
			return response.data;
		})
		.catch(err => {
			return String(err)
		})
});

export const saveSubjects = (data) => ({
	type: SAVE_SUBJECTS,
	payload: axios.post("http://localhost/treemind/contentLocal.php", "action=save&content=" + data)
		.then(response => response.data)
		.catch(err => String(err))
});

export const addSubject = (data) => {
	return {type: ADD_SUBJECT, data};
};

export const removeSubject = (id) => {
	return {type: REMOVE_SUBJECT, id};
};

export const updateSubject = (subjectId, data) => {
	return ({type: UPDATE_SUBJECT, subjectId, data})
};

export const removeSubjectChild = (id, childId) => {
	return {type: REMOVE_SUBJECT_CHILD, id, childId}
};

export const addSubjectChild = (subjectId, data) => {
	return {type: ADD_SUBJECT_CHILD, subjectId, data}
};

export const updateSubjectChild = (subjectId, childId, data) => {
	return {type: UPDATE_SUBJECT_CHILD, subjectId, childId, data}
};

export const setAttachSubjectChild = (subjectId, childId, attachSubjectId) => {
	return {type: SET_ATTACH_SUBJECT_CHILD, subjectId, childId, attachSubjectId}
};

export const removeAttachSubjectChild = (subjectId, childId) => {
	return {type: REMOVE_ATTACH_SUBJECT_CHILD, subjectId, childId}
};


export const subjectsReducer = (state = {}, action) => {
	switch (action.type) {
		case FETCH_SUBJECTS + "_FULFILLED":
			try {
				state = JSON.parse(action.payload);
			} catch (e) {
				if (action.payload instanceof Object) {
					state = action.payload;
				} else state = {}
			}
			break;
		case FETCH_SUBJECTS + "_PENDING":
			break;
		case SAVE_SUBJECTS + "_FULFILLED":
			if(action.payload.success) alert("Zapisano pomyślnie");
			else alert("Wystąpił błąd podczas zapisu");
			break;
		case ADD_SUBJECT:
			state[greatestKey(state) + 1] = action.data;
			break;
		case REMOVE_SUBJECT:
			state[action.id].removed = true;
			break;
		case UPDATE_SUBJECT:
			let subject = state[action.subjectId];
			subject = {...subject, ...action.data};
			state[action.subjectId] = subject;
			break;
		case ADD_SUBJECT_CHILD:
			let nextId = greatestKey(state[action.subjectId].children) + 1;
			state[action.subjectId].children[nextId] = action.data;
			break;
		case REMOVE_SUBJECT_CHILD:
			state[action.id].children[action.childId].removed = true;
			break;
		case UPDATE_SUBJECT_CHILD:
			let child = state[action.subjectId].children[action.childId];
			child = {...child, ...action.data};
			state[action.subjectId].children[action.childId] = child;
			break;
		case SET_ATTACH_SUBJECT_CHILD: {
			state[action.subjectId].children[action.childId].attach = action.attachSubjectId;
			break;
		}
		case REMOVE_ATTACH_SUBJECT_CHILD: {
			delete state[action.subjectId].children[action.childId].attach;
			break;
		}
		default:
			return state;
	}
	return {...state}
};





