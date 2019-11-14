import React from 'react';
import SubjectList from 'components/subjectList';
import Header from 'components/header';
import ReduxWrapper from 'store/wrapper';

import 'css/app.css';

function App() {
	return (
		<ReduxWrapper>
			<div className="App">
				<Header/>
				<SubjectList/>
			</div>
		</ReduxWrapper>
	);
}

export default App;
