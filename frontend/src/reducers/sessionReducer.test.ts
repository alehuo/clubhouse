import { toggleSessionPage } from "./actions/sessionActions";
import sessionReducer, { SessionState } from "./sessionReducer";

describe("sessionReducer", () => {
  it("Initial state should be correct", () => {
    // @ts-ignore
    expect(sessionReducer(undefined, {})).toEqual({
      sessionPage: false,
      ownSessionRunning: false,
      ownSessionPeopleCount: 0,
      ownSessionStartTime: undefined,
      sessionCheckInterval: undefined,
      endSessionModalOpen: false,
      startSessionModalOpen: false,
      sendMessageModalOpen: false,
      isEnding: false,
      isStarting: false,
    });
  });
  it("Action TOGGLE_SESSION_PAGE should set sessionPage value correctly (false)", () => {
    expect(sessionReducer(undefined, toggleSessionPage(false))).toMatchObject<
      Partial<SessionState>
    >({
      sessionPage: false,
    });
  });
  it("Action TOGGLE_SESSION_PAGE should set sessionPage value correctly (true)", () => {
    expect(sessionReducer(undefined, toggleSessionPage(true))).toMatchObject<
      Partial<SessionState>
    >({
      sessionPage: true,
    });
  });
});
