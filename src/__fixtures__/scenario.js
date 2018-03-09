export default function createScenario(fixtures = () => ({})) {
  return (label, run) => {
    const steps = [];

    run({
      given: (label, step) => steps.push(step),
      when: (label, step) => steps.push(step),
      then: (label, step) => steps.push(step),
      fixtures: fixtures(),
    });

    it(label, () =>
      steps.reduce((state, step) => state
        .then(wrapper => step(wrapper) || wrapper)
        .then(wrapper => new Promise(res => process.nextTick(() => { wrapper && wrapper.update(); res(wrapper); }))),
      Promise.resolve(undefined)));
  };
};
