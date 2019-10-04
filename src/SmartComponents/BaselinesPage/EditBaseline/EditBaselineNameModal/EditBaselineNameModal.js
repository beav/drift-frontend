import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Modal, TextInput } from '@patternfly/react-core';

import { editNameModalActions } from './redux';
import { baselinesTableActions } from '../../../BaselinesTable/redux';

class EditBaselineNameModal extends Component {
    constructor(props) {
        super(props);

        /*eslint-disable camelcase*/
        this.state = {
            baselineName: this.props.baselineData.display_name
        };
        /*eslint-enable camelcase*/

        this.updateBaselineName = (value) => {
            this.setState({ baselineName: value });
        };
    }

    confirmModal = () => {
        const { baselineName } = this.state;
        const { baselineData, patchBaseline, toggleEditNameModal } = this.props;

        /*eslint-disable camelcase*/
        patchBaseline(baselineData.id, { display_name: baselineName, facts_patch: []});
        /*eslint-enable camelcase*/

        toggleEditNameModal();
    }

    cancelModal = () => {
        const { toggleEditNameModal, baselineData } = this.props;

        /*eslint-disable camelcase*/
        this.updateBaselineName(baselineData.display_name);
        /*eslint-enable camelcase*/
        toggleEditNameModal();
    }

    renderModalBody() {
        const { baselineName } = this.state;

        return (<div className='fact-value'>
            <b>Baseline title</b>
            <br></br>
            <TextInput
                value={ baselineName }
                type="text"
                onChange={ this.updateBaselineName }
                isValid={ baselineName !== '' ? true : false }
                aria-label="baseline name"
            />
        </div>);
    }

    render() {
        const { editNameModalOpened } = this.props;

        return (
            <Modal
                className='small-modal-body'
                title="Edit title"
                isOpen={ editNameModalOpened }
                onClose={ this.cancelModal }
                width="auto"
                actions={ [
                    <Button
                        key="confirm"
                        variant="primary"
                        onClick={ this.confirmModal }>
                        Save
                    </Button>,
                    <Button
                        key="cancel"
                        variant="secondary"
                        onClick={ this.cancelModal }>
                        Cancel
                    </Button>
                ] }
            >
                { this.renderModalBody() }
            </Modal>
        );
    };
}

EditBaselineNameModal.propTypes = {
    baselineId: PropTypes.string,
    baselineName: PropTypes.string,
    baselineData: PropTypes.obj,
    editNameModalOpened: PropTypes.bool,
    toggleEditNameModal: PropTypes.func,
    patchBaseline: PropTypes.func
};

function mapStateToProps(state) {
    return {
        baselineData: state.baselinesTableState.baselineData,
        editNameModalOpened: state.editNameModalState.editNameModalOpened
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toggleEditNameModal: () => dispatch(editNameModalActions.toggleEditNameModal()),
        patchBaseline: (baselineId, newBaselineBody) => dispatch(baselinesTableActions.patchBaseline(baselineId, newBaselineBody))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBaselineNameModal);