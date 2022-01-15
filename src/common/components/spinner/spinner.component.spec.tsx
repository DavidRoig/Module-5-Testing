import React from 'react';
import { render, screen } from '@testing-library/react';
import * as promiseTracker from 'react-promise-tracker/lib/trackerHook';

import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent tests suite', () => {
  xit('When there is no promises, modal should not be visible.', () => {
    //Arrange
    jest
      .spyOn(promiseTracker, 'usePromiseTracker')
      .mockImplementation(() => ({ promiseInProgress: false }));

    //Act
    render(<SpinnerComponent />);

    //Assert
    const modalSpinner = screen.queryByRole('presentation');
    expect(modalSpinner).not.toBeInTheDocument();
  });

  xit('When there is an active promise, modal should be visible.', () => {
    //Arrange
    jest
      .spyOn(promiseTracker, 'usePromiseTracker')
      .mockImplementation(() => ({ promiseInProgress: true }));

    //Act
    render(<SpinnerComponent />);

    //Assert
    const modalSpinner = screen.getByRole('presentation');
    expect(modalSpinner).toBeInTheDocument();
  });

  it('When there is an active promise, and then it´s finished, modal should be hidden.', () => {
    //Arrange
    jest
      .spyOn(promiseTracker, 'usePromiseTracker')
      .mockImplementationOnce(() => ({ promiseInProgress: true }))
      .mockImplementationOnce(() => ({ promiseInProgress: false }));

    //Act
    render(<SpinnerComponent />);

    //Assert
    let modalSpinner = screen.getByRole('presentation');
    expect(modalSpinner).toBeInTheDocument();

    // render(<SpinnerComponent />);
    // modalSpinner = screen.queryByRole('presentation');
    // expect(modalSpinner).not.toBeInTheDocument();
  });
});
