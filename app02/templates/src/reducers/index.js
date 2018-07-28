const initialState = {
  templates: [],
  activeTemplateId: '',
  activeTemplateHTML: '',
  showPanel: false,
  showButton: false
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_TEMPLATE':
      return { ...state, templates: action.payload };

    case 'SAVE_TEMPLATE':
      const newStateTemplates = state.templates.map(e => {
        if (e.id === state.activeTemplateId) {
          e.template = state.activeTemplateHTML;
          e.modified = Date.now();
        }
        return e;
      });
      return {
        ...state,
        templates: newStateTemplates,
        activeTemplateId: '',
        activeTemplateHTML: ''
      };

    case 'RESET_TEMPLATE':
      const activeTemplate = state.templates.find(
        e => e.id === state.activeTemplateId
      );
      return {
        ...state,
        activeTemplateHTML: activeTemplate.template,
        showPanel: false,
        showButton: false
      };

    case 'TEMPLATE_SELECT':
      return {
        ...state,
        activeTemplateId: action.payload.id,
        activeTemplateHTML: action.payload.template,
        showPanel: false,
        showButton: false
      };

    case 'FIELD_CLICK_EVENT':
      return { ...state, showPanel: true };

    case 'OK_CLICK_EVENT': {
      return {
        ...state,
        activeTemplateHTML: action.payload,
        showPanel: false,
        showButton: true
      };
    }

    default:
      return state;
  }
}
