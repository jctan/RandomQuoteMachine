(function () {
  'use strict';

  describe('Learning about spies', function () {
      it('replaces the function it is spying on', function () {
        myObj.someMethod();

          expect(myObj.someMethod()).toBe("Hello There");
      });
  });
})();
