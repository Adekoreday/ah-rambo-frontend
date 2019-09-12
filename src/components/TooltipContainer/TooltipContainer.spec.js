import CheckPropTypes from 'check-prop-types';
import TooltipContainer from './TooltipContainer';

const setup = (propsOverride) => {
  const props = {
    className: 'TooltipContainer',
    children: new Array(),
    onClick: jest.fn(),
    ...propsOverride,
  };

  const wrapper = shallow(<TooltipContainer {...props} />);
  return { props, wrapper };
};

describe('Tooltip Component Rendering', () => {
  it('renders without crashing', () => {
    const { wrapper } = setup();
    expect(wrapper.find('.TooltipContainer')).toHaveLength(1);
  });

  it('renders any elements passed as its children', () => {
    const { wrapper } = setup({ children: <p>inside tooltip container</p> });
    expect(wrapper.find('p').text()).toBe('inside tooltip container');
  });

  it('does not throw warning when prop types are valid', () => {
    const { props: expectedProps } = setup();
    const propsError = CheckPropTypes(
      TooltipContainer.propTypes,
      expectedProps,
      'props',
      TooltipContainer.name
    );
    expect(propsError).toBeUndefined();
  });
});
