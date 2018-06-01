/* cat-clicker-specader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
(function() {
    describe('Cat clicking', function() {
        
        it('increase counter', function() {
            const counterClickBefore = photoCatClickCounter;
            increaseCatPhotoCounter();
            const counterClickAfter = photoCatClickCounter;
            expect(counterClickAfter - counterClickBefore).toBeGreaterThan(0);
        });

    });

}());
