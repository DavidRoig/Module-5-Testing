import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

const dialogTitle = 'Title';
const closeLabel = 'close';
const acceptLabel = 'open';

describe('ConfirmationDialogComponent specs', () => {
  it('When dialog is closed nothing should be render', () => {
    // Arrange
    const props = createConfirmationDialogProps(false);

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    const modalDialog = screen.queryByRole('dialog');
    expect(modalDialog).toBeNull();
  });

  it('When dialog is opened should be render', () => {
    // Arrange
    const props = createConfirmationDialogProps();

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    const modalDialog = screen.getByRole('dialog');
    expect(modalDialog).not.toBeNull();
  });

  it('When props are valid  should render a Confirmation Dialog with correct title.', () => {
    // Arrange
    const props = createConfirmationDialogProps();

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    const titleElement = screen.getByRole('heading', {
      name: dialogTitle,
    });

    expect(titleElement).not.toBeNull();
    expect(titleElement.tagName).toEqual('H2');
  });

  it('When props are valid should render a Confirmation Dialog with correct button labels.', () => {
    // Arrange
    const props = createConfirmationDialogProps();

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    const acceptElement = screen.getByRole('button', { name: acceptLabel });
    const closeElement = screen.getByRole('button', { name: closeLabel });

    expect(acceptElement).not.toBeNull();
    expect(closeElement).not.toBeNull();
  });

  it('When accept dialog should invoke onAccept method.', () => {
    // Arrange
    const props = createConfirmationDialogProps();

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    const acceptElement = screen.getByRole('button', { name: acceptLabel });
    fireEvent.click(acceptElement);

    expect(props.onAccept).toBeCalled();
  });

  it('When close dialog should invoked onClose method.', () => {
    // Arrange
    const props = createConfirmationDialogProps();

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    const closeElement = screen.getByRole('button', { name: closeLabel });
    fireEvent.click(closeElement);

    expect(props.onClose).toBeCalled();
  });
});

function createConfirmationDialogProps(isOpen: boolean = true) {
  return {
    isOpen,
    onAccept: jest.fn(),
    onClose: jest.fn(),
    title: dialogTitle,
    labels: {
      closeButton: closeLabel,
      acceptButton: acceptLabel,
    },
  };
}
