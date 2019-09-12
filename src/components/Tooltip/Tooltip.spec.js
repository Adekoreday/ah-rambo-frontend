import CheckPropTypes from 'check-prop-types';
import Tooltip from './Tooltip';

const setup = (propsOverride) => {
  const props = {
    className: 'Tooltip__content',
    children: new Array(),
    onClick: jest.fn(),
    ...propsOverride,
  };

  const wrapper = shallow(<Tooltip {...props} />);
  return { props, wrapper };
};

describe('Tooltip Component Rendering', () => {
  it('renders without crashing', () => {
    const { wrapper } = setup();
    expect(wrapper.find('.Tooltip__content')).toHaveLength(1);
  });

  it('renders a close button for the tooltip by default', () => {
    const { wrapper } = setup();
    expect(wrapper.find('.close-btn')).toHaveLength(1);
  });

  it('renders any elements passed as its children', () => {
    const { wrapper } = setup({ children: <p>hello world</p> });
    expect(wrapper.find('p').text()).toBe('hello world');
  });

  it('does not throw warning when prop types are valid', () => {
    const { props: expectedProps } = setup();
    const propsError = CheckPropTypes(
      Tooltip.propTypes,
      expectedProps,
      'props',
      Tooltip.name
    );
    expect(propsError).toBeUndefined();
  });
});
