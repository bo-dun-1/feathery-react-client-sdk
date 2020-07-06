import { create } from 'react-test-renderer';

import Feathery from './Feathery';
import React from 'react';

describe('Feathery', () => {
    const App = () => <div>My App</div>;

    global.fetch = jest.fn(() => {
        return Promise.resolve({
            status: 200,
            json: () => [{ key: 'test_key', value: true, datatype: 'boolean' }]
        });
    });

    beforeEach(() => {
        fetch.mockClear();
    });

    test('render app', () => {
        const LaunchDarklyApp = withLDProvider({ clientSideID })(App);
        const component = create(<LaunchDarklyApp />);
        expect(component).toMatchSnapshot();
    });

    it('query sync', () => {
        const FeatheryApp = Feathery({})(App);
        const component = create(<FeatheryApp />);
        expect(component).toMatchSnapshot();
    });
});
