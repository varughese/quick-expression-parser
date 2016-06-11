describe("Tests", function() {

    describe("Find op", function() {

        it("Simple", function() {
            expect( findOperator(['2', '*', '4']) ).toBe( 1 );
        });

        it("Full equation", function() {
            expect( findOperator(['2', '*', '4', '+', '2']) ).toBe( 1 );
        });

        it("PEMDAS", function() {
            expect( findOperator(['2', '+', '4', '*', '2']) ).toBe( 3 );
        });

        it("Addition Subtraction in LTR", function() {
            expect( findOperator(['2', '+', '4', '-', '2']) ).toBe( 1 );
        });

    });

    describe("Convert to stack", function() {
        it("Simple", function() {
            expect( convertToStack("2*4") ).toEqual( ['2', '*', '4'] );
        });
        it("Two digit nums", function() {
            expect( convertToStack("22*4") ).toEqual( ['22', '*', '4'] );
        });
        it("Two two digit nums", function() {
            expect( convertToStack("22*46") ).toEqual( ['22', '*', '46'] );
        });
        it("Differiantes negative and subtract", function() {
            expect( convertToStack("-22*46") ).toEqual( ['-22', '*', '46'] );
        });
        it("Differiantes negative and subtract", function() {
            expect( convertToStack("22*-46") ).toEqual( ['22', '*', '-46'] );
        });
        it("Differiantes negative and subtract", function() {
            expect( convertToStack("22--46") ).toEqual( ['22', '-', '-46'] );
        });
        it("find parens", function() {
            expect( convertToStack("22*4/(4+3)") ).toEqual( ['22', '*', '4', '/', '(', '4', '+', '3', ')'] );
        });
    });

    describe("Replace method", function() {
        it("simple", function() {
            expect( replace(['2', '*', '4'], 1) ).toEqual( [8] );
        });
        it("longer array", function() {
            expect( replace(['2', '+', '4', '*', '5'], 3) ).toEqual( ['2', '+', 20] );
        });
        it("op in the mid of array", function() {
            expect( replace(['2', '+', '4', '*', '5', '-', '2'], 3) ).toEqual( ['2', '+', 20, '-', '2'] );
        });
    });

    describe("simplifyStack method", function() {
        it("addition", function() {
            expect( simplifyStack(['2', '+', '3']) ).toEqual( 5 );
        });
    });

    describe("recurse method", function() {
        it("solves simple", function() {
            expect( recurse(['2', '+', '3']) ).toEqual( 5 );
        });
        it("solves pemdas", function() {
            expect( recurse(['2', '+', '3', '*', '7']) ).toEqual( 23 );
        });
        it("solves pemdas in LTR", function() {
            expect( recurse(['2', '+', '3', '-', '7']) ).toEqual( -2 );
        });
        it("handles parens", function() {
            expect( recurse(["3", "+", "2", "+", "(", "1", "+", "2", ")", "+", "4"]) ).toEqual( 12 );
            expect( recurse(["3", "*", "(", "2", "+", "3", ")"]) ).toEqual( 15 );
        });
    });

    describe("calc expression", function() {
        it("Simplifies", function() {
            expect( calcExpression("2+3") ).toBe(5);
            expect( calcExpression("2*3") ).toBe(6);
            expect( calcExpression("2+3*(4+3)") ).toBe(23);
            expect( calcExpression("2+-3*(1+3)") ).toBe(-10);
        });
    });
});
