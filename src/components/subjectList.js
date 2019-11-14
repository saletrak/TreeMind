import React from 'react';
import {connect} from "react-redux";

import Subject from 'components/subject';

import styles from 'css/subjects.module.css';
import {addSubject, fetchSubjects} from "store/reducers/subjectReducer";

export const defaultSubjectData = {
	name: "",
	children: null,
	removed: false,
};

class SubjectList extends React.Component {
	constructor(props) {
		super(props);

		this.$newInput = React.createRef();

		this.submitBtnAdd = this.submitBtnAdd.bind(this);
	}

	submitBtnAdd(ev) {
		if (ev.key === "Enter") {
			console.log(defaultSubjectData);
			this.props.dispatch(addSubject({...defaultSubjectData, name: this.$newInput.current.value, children: {}}));
			this.$newInput.current.value = "";
		}
	}

	componentDidMount() {
		this.props.dispatch(fetchSubjects())
	}

	render() {
		return (
			<>
				<div className={styles.header_mockup}/>
				<div className={styles.subjects}>
					{Object.keys(this.props.subjects).map(key => {
						if (this.props.subjects[key].removed) return null;
						return <Subject id={key} data={this.props.subjects[key]} key={key}/>
					})}
					<div className={styles.subject_wrapper}>
						<div className={styles.subject}>
							<input type='text' placeholder="+ Dodaj" className={styles.name}
								   onKeyDown={this.submitBtnAdd}
								   ref={this.$newInput}/>
						</div>
					</div>
				</div>
				{/*<pre>*/}
					{/*{JSON.stringify(this.props.subjects, null, 2)}*/}
				{/*</pre>*/}
			</>
		)
	}
}

export default connect(state => ({
	subjects: state.subjects,
	settings: state.settings,
}), null)(SubjectList)