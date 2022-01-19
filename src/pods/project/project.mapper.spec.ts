import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';

import { mapProjectFromApiToVm } from './project.mapper';

describe('project.mapper.ts tests suite', () => {
  it('When api model is null empty return empty view model.', () => {
    const apiModel: viewModel.Project = null;

    const result = mapProjectFromApiToVm(apiModel);

    verifyViewModelWithApiModel(result, createEmptyModel());
  });

  it('When api model is undefined return empty view model.', () => {
    const apiModel: viewModel.Project = undefined;

    const result = mapProjectFromApiToVm(apiModel);

    verifyViewModelWithApiModel(result, createEmptyModel());
  });

  it('When api model defines basic properties return same values.', () => {
    const apiModel: viewModel.Project = {
      id: 'id',
      name: 'dummy name',
      isActive: true,
      comments: null,
      externalId: '123',
      employees: [],
    };

    const result = mapProjectFromApiToVm(apiModel);

    verifyViewModelWithApiModel(result, apiModel);
  });

  it('When api model has single employee return same employee.', () => {
    const apiModel: viewModel.Project = {
      id: 'id',
      name: 'dummy name',
      isActive: true,
      comments: null,
      externalId: '123',
      employees: [
        {
          id: '100',
          employeeName: 'Employee 1',
          isAssigned: false,
        },
      ],
    };

    const result = mapProjectFromApiToVm(apiModel);

    verifyViewModelWithApiModel(result, apiModel);
  });

  it('When api model has multiple employees return same employees', () => {
    const apiModel: viewModel.Project = {
      id: 'id',
      name: 'dummy name',
      isActive: true,
      comments: null,
      externalId: '123',
      employees: [
        {
          id: '100',
          employeeName: 'Employee 1',
          isAssigned: false,
        },
        {
          id: '200',
          employeeName: 'Employee 2',
          isAssigned: true,
        },
        {
          id: '300',
          employeeName: 'Employee 3',
          isAssigned: true,
        },
      ],
    };

    const result = mapProjectFromApiToVm(apiModel);

    verifyViewModelWithApiModel(result, apiModel);
  });
});

function verifyViewModelWithApiModel(
  result: viewModel.Project,
  expected: apiModel.Project
) {
  expect(result).not.toBeNull();
  expect(result.id).toBe(expected.id);
  expect(result.name).toBe(expected.name);
  expect(result.externalId).toBe(expected.externalId);
  expect(result.comments).toBe(expected.comments);
  expect(result.isActive).toBe(expected.isActive);

  verifyEmployees(result.employees, expected.employees);
}

function verifyEmployees(
  resultList: viewModel.EmployeeSummary[],
  expectedList: apiModel.EmployeeSummary[]
) {
  expect(resultList?.length).toBe(expectedList?.length);
  expect(resultList).toEqual(expect.arrayContaining(expectedList));
}

function createEmptyModel(): apiModel.Project {
  return {
    id: '',
    name: '',
    isActive: false,
    comments: '',
    externalId: '',
    employees: [],
  };
}
