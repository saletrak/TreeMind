import React from 'react';
import {connect} from 'react-redux';

import AttachInput from 'components/attachInput';

import styles from 'css/subjects.module.css';
import {removeSubjectChild, updateSubjectChild} from "store/reducers/subjectReducer";
import {debounce} from "lodash";

class SubjectChild extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			attachInputVisible: false,
			descTextareaVisible: true,
		};

		this.$nameInput = React.createRef();
		this.$childDesc = React.createRef();
		this.$doneInput = React.createRef();

		this.textareaAutoGrow = this.textareaAutoGrow.bind(this);
		this.clickBtnAttach = this.clickBtnAttach.bind(this);
		this.clickBtnRemove = this.clickBtnRemove.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleInputFocus = this.handleInputFocus.bind(this);
		this.handleRowBlur = this.handleRowBlur.bind(this);
		this.handleTextareaBlur = this.handleTextareaBlur.bind(this);
		this.hideTextarea = this.hideTextarea.bind(this);
		this.serialize = this.serialize.bind(this);
	}

	hideTextarea() {
		if (this.$childDesc.current.value === "") {
			this.setState({...this.state, descTextareaVisible: false});
		} else {
			this.setState({...this.state, descTextareaVisible: true});
		}
	}

	textareaAutoGrow() {
		this.$childDesc.current.style.height = "5px";
		this.$childDesc.current.style.height = (this.$childDesc.current.scrollHeight) + "px";
	}

	clickBtnAttach() {
		this.setState({...this.state, attachInputVisible: !this.state.attachInputVisible})
	}

	clickBtnRemove() {
		this.props.dispatch(removeSubjectChild(this.props.subjectId, this.props.childId));
	}

	debounceEvent(...args) {
		this.debouncedEvent = debounce(...args);
		return e => {
			e.persist();
			return this.debouncedEvent(e);
		};
	}

	handleChange = () => {
		this.props.dispatch(updateSubjectChild(this.props.subjectId, this.props.childId, this.serialize()));
	};

	handleInputFocus() {
		if (!this.state.descTextareaVisible) {
			this.setState({...this.state, descTextareaVisible: true});
			this.$childDesc.current.style.height = (this.$childDesc.current.scrollHeight) + "px";
		}
	}

	handleRowBlur() {
		// setTimeout(function () {
		// 	console.log("focus", this.$childDesc.current.focus);
		// 	if (this.$childDesc.current.value === "" && !this.$childDesc.current.focused) {
		// 		this.setState({...this.state, descTextareaVisible: false});
		// 	}
		// }.bind(this), 100);
	}

	handleTextareaBlur() {
		this.hideTextarea();
	}

	componentWillUmount() {
		this.debouncedEvent.cancel();
		window.removeEventListener("resize", this.textareaAutoGrow);
	}

	componentDidMount() {
		window.addEventListener("resize", this.textareaAutoGrow);

		this.hideTextarea();
		this.textareaAutoGrow();
	}

	serialize() {
		return {
			name: this.$nameInput.current.value,
			desc: this.$childDesc.current.value,
			isDone: this.$doneInput.current.checked,
		}
	}

	render() {
		let textAreaStyles = {
			display: this.state.descTextareaVisible ? "block" : "none"
		};

		return (
			<div className={styles.row}>
				<div className={styles.dot}>
					<input type="checkbox" defaultChecked={this.props.data.isDone} ref={this.$doneInput}
						   onChange={this.debounceEvent(this.handleChange, 1000)}/>
				</div>
				<div className={styles.content} onBlur={this.handleRowBlur}>
					<div className={styles.header}>
						<input type='text'
							   defaultValue={this.props.data.name}
							   className={styles.child_name}
							   ref={this.$nameInput}
							   onFocus={this.handleInputFocus}
							   onChange={this.debounceEvent(this.handleChange, 1000)}/>
						<i className={["material-icons", styles.btn_attach].join(" ")}
						   onClick={this.clickBtnAttach}>link</i>
						<i className={["material-icons", styles.btn_remove].join(" ")}
						   onClick={this.clickBtnRemove}>clear</i>
					</div>
					<AttachInput subjectId={this.props.subjectId} childId={this.props.childId}
								 data={this.props.data.attach} visible={this.state.attachInputVisible}/>
					<textarea className={styles.child_desc}
							  style={textAreaStyles}
							  placeholder={"Dodaj opis"}
							  ref={this.$childDesc}
							  onInput={this.textareaAutoGrow}
							  defaultValue={this.props.data.desc}
							  onBlur={this.handleTextareaBlur}
							  spellCheck={false}
							  onChange={this.debounceEvent(this.handleChange, 1000)}/>
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	subjects: state.subjects,
	settings: state.settings,
}), null)(SubjectChild)