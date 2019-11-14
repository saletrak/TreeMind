const UPDATE_SETTING = "UPDATE_SETTING";

const settingDefault = {
	darkMode: false
};

export const updateSetting = (name, value) => {
	return ({type: UPDATE_SETTING, name, value});
};

export const settingsReducer = (state = settingDefault, action) => {
	switch (action.type) {
		case UPDATE_SETTING:
			state[action.name] = action.value;
			return {...state};
		default:
			return state;
	}
};