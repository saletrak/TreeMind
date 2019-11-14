import React from 'react';
import {debounce} from "lodash";

import SubjectChild from 'components/subjectChild';

import styles from 'css/subjects.module.css';
import {connect} from "react-redux";
import {addSubjectChild, removeSubject, updateSubject} from "store/reducers/subjectReducer";

export const defaultChildData = {
	name: "",
	desc: "",
	isDone: false,
	removed: false,
};

class Subject extends React.Component {

	constructor(props) {
		super(props);

		this.$nameInput = React.createRef();
		this.$newInput = React.createRef();

		this.submitNewChildInput = this.submitNewChildInput.bind(this);
		this.clickBtnRemove = this.clickBtnRemove.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.serialize = this.serialize.bind(this);
	}

	submitNewChildInput(ev) {
		if (ev.key === "Enter") {
			this.props.dispatch(addSubjectChild(this.props.id, {
				...defaultChildData,
				name: this.$newInput.current.value
			}));
			this.$newInput.current.value = "";
		}
	}

	clickBtnRemove() {
		this.props.dispatch(removeSubject(this.props.id))
	}

	debounceEvent(...args) {
		this.debouncedEvent = debounce(...args);
		return e => {
			e.persist();
			return this.debouncedEvent(e);
		};
	}

	handleChange = () => {
		this.props.dispatch(updateSubject(this.props.id, this.serialize()));
	};

	componentWillUmount() {
		this.debouncedEvent.cancel();
	}

	serialize() {
		return {
			name: this.$nameInput.current.value
		}
	}

	render() {
		return (
			<div className={styles.subject_wrapper}>
				<div className={styles.subject} id={"subjectId_"+this.props.id}>
					<div className={styles.subject_header}>
						<input type='text' defaultValue={this.props.data.name} className={styles.name}
							   onChange={this.debounceEvent(this.handleChange, 1000)} ref={this.$nameInput}/>
						<i className={["material-icons", styles.btn].join(" ")}
						   onClick={this.clickBtnRemove}>clear</i>
					</div>
					<div className={styles.children}>
						{Object.keys(this.props.data.children).map(childKey => {
							if (this.props.data.children[childKey].removed) return null;
							return <SubjectChild subjectId={this.props.id} childId={childKey}
												 data={this.props.data.children[childKey]} key={childKey}/>

						})}
						{/* FORM TO CREATE NEW CHILD */}
						<div className={styles.row}>
							<div className={styles.dot}>
								<input type="checkbox"/>
							</div>
							<div className={styles.content}>
								<input type='text' placeholder="Dodaj" className={styles.child_name}
									   onKeyDown={this.submitNewChildInput} ref={this.$newInput}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	subjects: state.subjects,
	settings: state.settings,
}), null)(Subject)