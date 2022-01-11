import { act, renderHook } from '@testing-library/react-hooks';
import { useConfirmationDialog } from './confirmation-dialog.hook';
import { Lookup } from 'common/models';

describe('confirmation-dialog.hook specs', () => {
  it('When hook is initialized, initial values should be correct.', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    expectItemToDelete(result.current.itemToDelete);
    expect(result.current.isOpen).toEqual(false);
    expect(result.current.onAccept).toEqual(expect.any(Function));
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
    expect(result.current.onClose).toEqual(expect.any(Function));
  });

  it('When open dialog, isOpen should be true', () => {
    // Arrange
    const item = createItem();

    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(item);
    });

    // Assert
    expect(result.current.isOpen).toEqual(true);
  });

  it('When open dialog, itemToDelete should be setted', () => {
    // Arrange
    const item = createItem();

    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(item);
    });

    // Assert
    expect(result.current.itemToDelete).toEqual(item);
  });

  it('When close is clicked, should close dialog', () => {
    // Arrange
    const item = createItem();

    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(item);
      result.current.onClose();
    });

    // Assert
    expect(result.current.isOpen).toEqual(false);
  });

  it('When accept is clicked, itemToDelete should be empty', () => {
    // Arrange
    const item = createItem();

    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(item);
      result.current.onAccept();
    });

    // Assert
    expectItemToDelete(result.current.itemToDelete);
  });
});

function createItem(): Lookup {
  return {
    id: '100',
    name: 'dummy',
  };
}

function expectItemToDelete(lookup: Lookup) {
  expect(lookup.id).toEqual('');
  expect(lookup.name).toEqual('');
}
