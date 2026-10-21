// Year 10 topics: the start of the GCSE course.
// They belong to the same five strands as the Year 7 to 9 topics, so the menu files
// them under Number, Algebra and so on, marked Y10.

(function (root) {
  'use strict';
  const M = typeof module !== 'undefined' && module.exports ? require('../maths.js') : root.MathsEngine;
  const { rand, randNonZero, pick, roundDp, MINUS, num, numB, money, frac, sup, poly, xPlus,
    numberChecker, expressionChecker, fractionChecker, rootsChecker, surdChecker } = M;

  const DEG = '°';
  const ROOT = '√';
  const PI = Math.PI;

  // ===================== NUMBER =====================

  // ----- Surds -----
  const SQUARE_FREE = [2, 3, 5, 6, 7, 10, 11];

  M.register({
    id: 'surds', keywords: 'square roots simplify irrational', name: 'Surds', strand: 'number', year: 'Y10', example: '√72 = 6√2',
    learn: {
      title: 'What are surds and how do I simplify them?',
      body: [
        'A <strong>surd</strong> is a square root that isn’t a whole number, like √2 or √7. Leaving it as a surd keeps the answer exact.',
        'The key rule: <strong>√(a × b) = √a × √b</strong>.',
        'To simplify, split the number into a <strong>square number</strong> times something else. Use the biggest square you can: √72 = √36 × √2 = 6√2.',
        'You can only add surds with the same number under the root, just like like terms: 2√3 + 5√3 = 7√3. Type √ with the √ key, or type sqrt.'
      ],
      eg: '√72 = √(36 × 2) = 6√2\n√12 + √27 = 2√3 + 3√3 = 5√3'
    },
    make(level) {
      const r = pick(SQUARE_FREE);
      if (level === 'foundation') {
        const k = rand(2, 6);
        const n = k * k * r;
        return {
          prompt: 'Simplify  ' + ROOT + n,
          kind: 'surd',
          hints: [
            'Look for a square number (4, 9, 16, 25, 36…) that divides into ' + n + '. Use the biggest one you can find.',
            'Which is the biggest square number that goes into ' + n + '? Then use √(a × b) = √a × √b.',
            n + ' = ' + k * k + ' × ' + r + ', so ' + ROOT + n + ' = ' + ROOT + (k * k) + ' × ' + ROOT + r + '. What is ' + ROOT + (k * k) + '?'
          ],
          solution: [ROOT + n + ' = ' + ROOT + '(' + k * k + ' × ' + r + ')', '= ' + ROOT + (k * k) + ' × ' + ROOT + r, '= ' + k + ROOT + r],
          answer: k + ROOT + r,
          check: surdChecker(k, r)
        };
      }
      let m, n;
      do { m = rand(1, 5); n = rand(2, 6); } while (m === n);
      const a = m * m * r, b = n * n * r;
      const show = x => x === 1 ? ROOT + r : x + ROOT + r;
      return {
        prompt: 'Simplify  ' + ROOT + a + ' + ' + ROOT + b,
        kind: 'surd',
        hints: [
          'You can’t add ' + ROOT + a + ' and ' + ROOT + b + ' straight away. Simplify each surd first. They should end up with the same number under the root.',
          'Find the biggest square number in ' + a + ', and the biggest in ' + b + '.',
          ROOT + a + ' = ' + show(m) + ' and ' + ROOT + b + ' = ' + show(n) + '. Now add them like like terms.'
        ],
        solution: [ROOT + a + ' = ' + ROOT + '(' + m * m + ' × ' + r + ') = ' + show(m), ROOT + b + ' = ' + ROOT + '(' + n * n + ' × ' + r + ') = ' + show(n), show(m) + ' + ' + show(n) + ' = ' + show(m + n)],
        answer: show(m + n),
        check: surdChecker(m + n, r)
      };
    }
  });

  // ----- Bounds -----
  M.register({
    id: 'bounds', keywords: 'error interval upper lower bound accuracy rounding', name: 'Bounds', strand: 'number', year: 'Y10', example: '4.3 to 1 d.p.',
    learn: {
      title: 'What are upper and lower bounds?',
      body: [
        'When a measurement has been rounded, the real value could be a bit bigger or smaller. The <strong>bounds</strong> are the smallest and biggest it could have been.',
        'Go <strong>half a unit</strong> down and up. Rounded to the nearest 10? Go 5 each way. To 1 decimal place? Go 0.05 each way.',
        'The <strong>error interval</strong> is written lower ≤ x < upper.',
        'For calculations: to get the biggest possible answer when multiplying, use both upper bounds.'
      ],
      eg: '4.3 (1 d.p.): lower bound 4.25, upper bound 4.35\nerror interval 4.25 ≤ x < 4.35\n\n6 cm × 8 cm, both to nearest cm:\nupper bound of area = 6.5 × 8.5 = 55.25 cm²'
    },
    make(level) {
      const which = pick(['lower', 'upper']);
      if (level === 'foundation') {
        const kind = pick([['the nearest 10', 10, rand(3, 99) * 10], ['the nearest whole number', 1, rand(2, 99)], ['1 decimal place', 0.1, rand(11, 99) / 10]]);
        const [desc, unit, value] = kind;
        const half = unit / 2;
        const bound = roundDp(which === 'lower' ? value - half : value + half, 3);
        return {
          prompt: 'A length is ' + value + ' cm, rounded to ' + desc + '. What is its ' + which + ' bound?',
          kind: 'number',
          hints: [
            'The real length could be a bit ' + (which === 'lower' ? 'smaller' : 'bigger') + ' than ' + value + ' cm and still round to ' + value + '.',
            'Rounded to ' + desc + ' means the real value is within half of ' + unit + ' of it. What is half of ' + unit + '?',
            'Half of ' + unit + ' is ' + half + '. ' + (which === 'lower' ? 'Take it away from ' : 'Add it to ') + value + '.'
          ],
          solution: ['Half of ' + unit + ' is ' + half, which === 'lower' ? value + ' − ' + half + ' = ' + bound : value + ' + ' + half + ' = ' + bound, 'The ' + which + ' bound is ' + bound + ' cm'],
          answer: bound + ' cm',
          check: numberChecker(bound, [{ value: roundDp(which === 'lower' ? value - unit : value + unit, 3), message: 'You went a whole ' + unit + '. The bound is only half a unit away: ' + half + '.' }])
        };
      }
      const a = rand(3, 12), b = rand(3, 12);
      const lo = (a - 0.5) * (b - 0.5), hi = (a + 0.5) * (b + 0.5);
      const bound = which === 'lower' ? lo : hi;
      const sideA = which === 'lower' ? a - 0.5 : a + 0.5, sideB = which === 'lower' ? b - 0.5 : b + 0.5;
      return {
        prompt: 'A rectangle measures ' + a + ' cm by ' + b + ' cm, both to the nearest cm. What is the ' + which + ' bound of its area?',
        kind: 'number',
        hints: [
          'First find the bounds of each side. To the nearest cm means half a centimetre either way.',
          'For the ' + (which === 'lower' ? 'smallest' : 'biggest') + ' possible area, use the ' + which + ' bound of both sides.',
          'The ' + which + ' bounds are ' + sideA + ' cm and ' + sideB + ' cm. Multiply them.'
        ],
        solution: ['Lengths: ' + (a - 0.5) + ' to ' + (a + 0.5) + ' cm and ' + (b - 0.5) + ' to ' + (b + 0.5) + ' cm', sideA + ' × ' + sideB + ' = ' + bound + ' cm²'],
        answer: bound + ' cm²',
        check: numberChecker(bound, [{ value: which === 'lower' ? hi : lo, message: 'That’s the other bound. For the ' + which + ' bound use the ' + which + ' bounds of both sides.' }, { value: a * b, message: 'That’s the area using the rounded lengths. Use the bounds of each side instead.' }])
      };
    }
  });

  // ----- Recurring decimals -----
  M.register({
    id: 'recurring', keywords: 'recurring decimals fraction repeating dot', name: 'Recurring decimals', strand: 'number', year: 'Y10', example: '0.444… = 4/9',
    learn: {
      title: 'How do I turn a recurring decimal into a fraction?',
      body: [
        'A <strong>recurring decimal</strong> repeats for ever, like 0.444… or 0.272727…',
        'Call the decimal x. Multiply by 10 if one digit repeats, or 100 if two digits repeat, so the repeating parts line up.',
        'Subtract to make the repeating part disappear, then divide.',
        'Shortcut: one repeating digit is that digit over 9 (0.444… = 4/9). Two repeating digits are over 99 (0.272727… = 27/99 = 3/11).'
      ],
      eg: 'x = 0.272727…\n100x = 27.272727…\n99x = 27\nx = 27/99 = 3/11'
    },
    make(level) {
      if (level === 'foundation') {
        const d = rand(1, 8);
        const shown = '0.' + String(d).repeat(4) + '…';
        return {
          prompt: 'Write ' + shown + ' (the ' + d + ' repeats for ever) as a fraction in its simplest form.',
          kind: 'fraction',
          hints: [
            'Let x = ' + shown + '. Only one digit repeats, so multiply by 10.',
            '10x = ' + d + '.' + String(d).repeat(4) + '…  What do you get if you subtract x from 10x?',
            '10x − x = 9x, and the decimals cancel: 9x = ' + d + '. So x = ?'
          ],
          solution: ['x = ' + shown, '10x = ' + d + '.' + String(d).repeat(4) + '…', '9x = ' + d + ', so x = ' + d + '/9' + (frac(d, 9) !== d + '/9' ? ' = ' + frac(d, 9) : '')],
          answer: frac(d, 9),
          check: fractionChecker(d, 9, [{ n: d, d: 10, message: 'That’s ' + d / 10 + ', which stops. The recurring decimal is a tiny bit more. Try the 10x − x method.' }])
        };
      }
      let ab;
      do { ab = rand(1, 98); } while (ab % 11 === 0);
      const digits = String(ab).padStart(2, '0');
      const shown = '0.' + digits.repeat(3) + '…';
      return {
        prompt: 'Write ' + shown + ' (the ' + digits + ' repeats for ever) as a fraction in its simplest form.',
        kind: 'fraction',
        hints: [
          'Let x = ' + shown + '. Two digits repeat, so multiply by 100 to line up the repeating parts.',
          '100x = ' + ab + '.' + digits.repeat(3) + '…  What happens when you subtract x?',
          '100x − x = 99x = ' + ab + '. Now divide by 99 and simplify.'
        ],
        solution: ['x = ' + shown, '100x = ' + ab + '.' + digits.repeat(3) + '…', '99x = ' + ab + ', so x = ' + ab + '/99' + (frac(ab, 99) !== ab + '/99' ? ' = ' + frac(ab, 99) : '')],
        answer: frac(ab, 99),
        check: fractionChecker(ab, 99, [{ n: ab, d: 100, message: 'That’s ' + ab / 100 + ', which stops. Use 100x − x to deal with the repeating part.' }])
      };
    }
  });

  // ===================== ALGEBRA =====================

  // ----- Quadratic equations -----
  M.register({
    id: 'quadratics', keywords: 'quadratic equations solve factorise formula x squared roots', name: 'Quadratic equations', strand: 'algebra', year: 'Y10', example: 'x² + 2x − 15 = 0',
    learn: {
      title: 'How do I solve a quadratic equation?',
      body: [
        'A quadratic equation has an x² term. It usually has <strong>two solutions</strong>.',
        '<strong>By factorising:</strong> get 0 on one side, factorise into two brackets, then set each bracket equal to 0. If (x + 5)(x − 3) = 0, then x = −5 or x = 3.',
        '<strong>The quadratic formula</strong> works when it won’t factorise. For ax² + bx + c = 0: x = (−b ± √(b² − 4ac)) ÷ 2a. The ± gives the two answers.',
        'Type both solutions, like x = 3 or x = −5.'
      ],
      eg: 'x² + 2x − 15 = 0\n(x + 5)(x − 3) = 0\nx = −5 or x = 3'
    },
    make(level) {
      if (level === 'foundation') {
        let p, q;
        do { p = randNonZero(-9, 9); q = randNonZero(-9, 9); } while (p === q);
        const eq = poly([[1, 'x²'], [p + q, 'x'], [p * q, '']]) + ' = 0';
        const r1 = -p, r2 = -q;
        return {
          prompt: 'Solve  ' + eq,
          kind: 'roots',
          hints: [
            'Factorise the left-hand side into two brackets (x + ?)(x + ?). The numbers multiply to ' + num(p * q) + ' and add to ' + num(p + q) + '.',
            'Once it’s factorised, one of the brackets must equal 0. Why? (Anything × 0 = 0.)',
            'It factorises to (' + xPlus(p) + ')(' + xPlus(q) + ') = 0. What value of x makes each bracket zero?'
          ],
          solution: [eq, '(' + xPlus(p) + ')(' + xPlus(q) + ') = 0', xPlus(p) + ' = 0  or  ' + xPlus(q) + ' = 0', 'x = ' + num(r1) + '  or  x = ' + num(r2)],
          answer: 'x = ' + num(r1) + ' or x = ' + num(r2),
          check: rootsChecker([r1, r2])
        };
      }
      let a, b, c, disc;
      do { a = rand(1, 3); b = randNonZero(-9, 9); c = randNonZero(-9, 9); disc = b * b - 4 * a * c; }
      while (disc <= 0 || Number.isInteger(Math.sqrt(disc)));
      const exact = [(-b + Math.sqrt(disc)) / (2 * a), (-b - Math.sqrt(disc)) / (2 * a)];
      const rounded = exact.map(x => roundDp(x, 2));
      const eq = poly([[a, 'x²'], [b, 'x'], [c, '']]) + ' = 0';
      return {
        prompt: 'Solve  ' + eq + '\nGive your answers to 2 decimal places.',
        kind: 'roots',
        hints: [
          'This doesn’t factorise nicely, so use the quadratic formula: x = (−b ± √(b² − 4ac)) ÷ 2a.',
          'Here a = ' + a + ', b = ' + num(b) + ', c = ' + num(c) + '. Work out b² − 4ac first.',
          'b² − 4ac = ' + b * b + ' − ' + numB(4 * a * c) + ' = ' + disc + '. So x = (' + num(-b) + ' ± √' + disc + ') ÷ ' + 2 * a + '. Work out the + and the − version.'
        ],
        solution: [
          'a = ' + a + ', b = ' + num(b) + ', c = ' + num(c),
          'b² − 4ac = ' + b * b + ' − ' + numB(4 * a * c) + ' = ' + disc,
          'x = (' + num(-b) + ' ± √' + disc + ') ÷ ' + 2 * a,
          'x = ' + num(rounded[0]) + '  or  x = ' + num(rounded[1]) + '  (2 d.p.)'
        ],
        answer: 'x = ' + num(rounded[0]) + ' or x = ' + num(rounded[1]),
        check: rootsChecker(rounded, { dp: 2, exact })
      };
    }
  });

  // ----- Parallel and perpendicular lines -----
  M.register({
    id: 'perpendicular', keywords: 'parallel perpendicular gradient lines negative reciprocal y = mx + c', name: 'Parallel & perpendicular lines', strand: 'algebra', year: 'Y10', example: 'y = 2x + 1',
    learn: {
      title: 'How do parallel and perpendicular gradients work?',
      body: [
        '<strong>Parallel</strong> lines never meet, so they have the <strong>same gradient</strong>.',
        '<strong>Perpendicular</strong> lines meet at a right angle. Their gradients multiply to −1. Flip the gradient and change its sign (the <strong>negative reciprocal</strong>): 2 becomes −1/2.',
        'To find the equation of a line, find its gradient m, then put a point into y = mx + c to find c.'
      ],
      eg: 'y = 2x + 1\nparallel gradient: 2\nperpendicular gradient: −1/2'
    },
    make(level) {
      const m = pick([-4, -3, -2, 2, 3, 4, 5]);
      const c = randNonZero(-8, 8);
      const line = 'y = ' + poly([[m, 'x'], [c, '']]);
      if (level === 'foundation') {
        if (Math.random() < 0.4) {
          return {
            prompt: 'What is the gradient of a line parallel to  ' + line + '?',
            kind: 'fraction',
            hints: ['Parallel lines never meet. What does that tell you about their steepness?', 'Parallel lines have the same gradient. Which number is the gradient of ' + line + '?', 'In y = mx + c, the gradient is m, the number in front of x.'],
            solution: ['Parallel lines have the same gradient', 'Gradient = ' + num(m)],
            answer: num(m),
            check: fractionChecker(m, 1, [{ n: -1, d: m, message: 'That’s the perpendicular gradient. Parallel lines have the same gradient.' }], { allowDecimal: true })
          };
        }
        return {
          prompt: 'What is the gradient of a line perpendicular to  ' + line + '?',
          kind: 'fraction',
          hints: ['Perpendicular lines meet at a right angle. Their gradients multiply to give −1.', 'Start with the gradient of ' + line + ', which is ' + num(m) + '. Flip it upside down and change its sign.', 'Flipping ' + num(m) + ' gives 1/' + num(m) + '. Now change the sign.'],
          solution: ['Gradient of the line = ' + num(m), 'Perpendicular gradient = −1 ÷ ' + numB(m) + ' = ' + frac(-1, m)],
          answer: frac(-1, m),
          check: fractionChecker(-1, m, [{ n: 1, d: m, message: 'Nearly: you flipped it, but also change the sign.' }, { n: -m, d: 1, message: 'You changed the sign, but also flip it upside down (the reciprocal).' }], { allowDecimal: true })
        };
      }
      // Equation of the perpendicular line through a point (whole-number answer for c)
      const k = randNonZero(-2, 2);
      const x0 = m * k, y0 = randNonZero(-6, 6);
      const c2 = y0 + x0 / m;
      const grad = frac(-1, m);
      // Written as −x/5 rather than −1/5x, which could be misread as 1 ÷ 5x
      const answerText = 'y = ' + (m > 0 ? MINUS : '') + 'x/' + Math.abs(m) + (c2 === 0 ? '' : (c2 > 0 ? ' + ' : ' ' + MINUS + ' ') + Math.abs(c2));
      return {
        prompt: 'Find the equation of the line perpendicular to  ' + line + '  that passes through (' + num(x0) + ', ' + num(y0) + ').',
        kind: 'expression',
        hints: [
          'First find the perpendicular gradient: flip the gradient of ' + line + ' and change its sign.',
          'The perpendicular gradient is ' + grad + '. Now put x = ' + num(x0) + ' and y = ' + num(y0) + ' into y = ' + grad + 'x + c.',
          num(y0) + ' = ' + grad + ' × ' + numB(x0) + ' + c, so ' + num(y0) + ' = ' + num(-x0 / m) + ' + c. What is c?'
        ],
        solution: ['Perpendicular gradient = ' + grad, num(y0) + ' = ' + grad + ' × ' + numB(x0) + ' + c', num(y0) + ' = ' + num(-x0 / m) + ' + c, so c = ' + num(c2), answerText],
        answer: answerText,
        check: expressionChecker('(-1/(' + m + '))*x+(' + c2 + ')', {
          mistakes: [{ expr: '(' + m + ')x+(' + (y0 - m * x0) + ')', message: 'That line is parallel, not perpendicular. Use the negative reciprocal of ' + num(m) + '.' }]
        })
      };
    }
  });

  // ===================== RATIO & PROPORTION =====================

  // ----- Reverse percentages -----
  M.register({
    id: 'reverse-percentages', keywords: 'reverse percentage original price before increase decrease sale vat', name: 'Reverse percentages', strand: 'ratio', year: 'Y10', example: 'After 20% off: £64',
    learn: {
      title: 'How do I find the original amount?',
      body: [
        'In a reverse percentage question you know the amount <strong>after</strong> a percentage change and need the amount <strong>before</strong>.',
        'The trap: don’t take the percentage of the new amount! The percentage was of the <strong>original</strong>.',
        'Work out what percentage the new amount is (a 20% increase means it’s 120% of the original), then divide by that multiplier.'
      ],
      eg: 'After a 20% increase, a price is £96.\n£96 is 120% of the original.\nOriginal = £96 ÷ 1.2 = £80'
    },
    make(level) {
      const p = pick(level === 'foundation' ? [10, 20, 25, 50] : [5, 15, 20, 30, 35, 40, 12.5]);
      const up = level === 'foundation' ? Math.random() < 0.5 : pick([true, false]);
      const original = rand(4, 40) * (level === 'foundation' ? 10 : 8);
      const mult = roundDp(1 + (up ? p : -p) / 100, 4);
      const after = roundDp(original * mult, 2);
      const scene = up ? 'After a ' + p + '% price rise, a bike costs ' + money(after) + '.' : 'In a ' + p + '% off sale, a coat costs ' + money(after) + '.';
      return {
        prompt: scene + ' What was the original price?',
        kind: 'number',
        hints: [
          'The ' + p + '% was a percentage of the ORIGINAL price, not of ' + money(after) + '. So don’t just ' + (up ? 'take ' + p + '% off' : 'add ' + p + '% on') + '.',
          money(after) + ' is ' + (up ? 100 + p : 100 - p) + '% of the original price. What decimal multiplier is that?',
          'The multiplier is ' + mult + '. Original × ' + mult + ' = ' + money(after) + ', so divide ' + money(after) + ' by ' + mult + '.'
        ],
        solution: [money(after) + ' is ' + (up ? 100 + p : 100 - p) + '% of the original', 'Original = ' + money(after) + ' ÷ ' + mult, '= ' + money(original)],
        answer: money(original),
        check: numberChecker(original, [{ value: roundDp(after * (up ? 1 - p / 100 : 1 + p / 100), 2), message: 'That’s the classic trap! The ' + p + '% was of the original price, not the new one. Divide by ' + mult + ' instead.' }])
      };
    }
  });

  // ----- Compound interest and depreciation -----
  M.register({
    id: 'compound', keywords: 'compound interest depreciation growth decay savings bank multiplier', name: 'Compound interest', strand: 'ratio', year: 'Y10', example: '£2000 at 3% for 4 years',
    learn: {
      title: 'How does compound interest work?',
      body: [
        '<strong>Simple interest</strong> adds the same amount each year. <strong>Compound interest</strong> adds interest on the interest too, so it grows faster each year.',
        'Use a multiplier: 3% interest means × 1.03 each year. For n years: amount = original × 1.03ⁿ.',
        '<strong>Depreciation</strong> is the same idea going down: losing 15% a year means × 0.85 each year.'
      ],
      eg: '£2000 at 3% compound interest for 4 years:\n£2000 × 1.03⁴ = £2251.02'
    },
    make(level) {
      if (level === 'foundation' || Math.random() < 0.5) {
        const P = pick([500, 800, 1000, 1200, 1500, 2000, 2500, 5000]);
        const r = pick([2, 3, 4, 5, 6, 1.5, 2.5]);
        const n = rand(2, level === 'foundation' ? 3 : 6);
        const mult = roundDp(1 + r / 100, 4);
        const exact = P * Math.pow(mult, n);
        const value = roundDp(exact, 2);
        return {
          prompt: '£' + P + ' is invested at ' + r + '% compound interest per year. How much is in the account after ' + n + ' years? Give your answer to the nearest penny.',
          kind: 'number',
          hints: [
            'Compound interest is added on to the new total each year. A multiplier makes it quick.',
            'Adding ' + r + '% means multiplying by ' + mult + '. You do that ' + n + ' times.',
            'Work out £' + P + ' × ' + mult + sup(n) + ' and round to 2 decimal places.'
          ],
          solution: ['Multiplier = 1 + ' + r + '/100 = ' + mult, '£' + P + ' × ' + mult + sup(n) + ' = ' + roundDp(exact, 4) + '…', '= ' + money(value)],
          answer: money(value),
          check: numberChecker(value, [{ value: roundDp(P * (1 + r / 100 * n), 2), message: 'That’s simple interest (the same amount each year). With compound interest each year’s interest is on the new total: use × ' + mult + sup(n) + '.' }], { dp: 2, exact })
        };
      }
      const P = pick([8000, 12000, 15000, 18000, 20000, 25000]);
      const r = pick([10, 12, 15, 20, 25]);
      const n = rand(2, 5);
      const mult = roundDp(1 - r / 100, 4);
      const exact = P * Math.pow(mult, n);
      const value = roundDp(exact, 2);
      return {
        prompt: 'A car worth £' + P + ' loses ' + r + '% of its value each year. What is it worth after ' + n + ' years? Give your answer to the nearest penny.',
        kind: 'number',
        hints: [
          'This is depreciation: the value goes down by ' + r + '% of the current value each year.',
          'Losing ' + r + '% leaves ' + (100 - r) + '%. What multiplier is that?',
          'The multiplier is ' + mult + '. Work out £' + P + ' × ' + mult + sup(n) + '.'
        ],
        solution: ['Multiplier = 1 − ' + r + '/100 = ' + mult, '£' + P + ' × ' + mult + sup(n) + ' = ' + money(value)],
        answer: money(value),
        check: numberChecker(value, [{ value: roundDp(P * (1 - r / 100 * n), 2), message: 'That takes off the same amount every year. Each year the ' + r + '% is of the NEW value: use × ' + mult + sup(n) + '.' }], { dp: 2, exact })
      };
    }
  });

  // ----- Density and compound measures -----
  M.register({
    id: 'density', keywords: 'density mass volume pressure force area compound measures', name: 'Density & pressure', strand: 'ratio', year: 'Y10', example: 'density = mass ÷ volume',
    learn: {
      title: 'What are density and pressure?',
      body: [
        '<strong>Density = mass ÷ volume.</strong> It tells you how heavy each cm³ is, in g/cm³. So mass = density × volume, and volume = mass ÷ density.',
        '<strong>Pressure = force ÷ area</strong>, measured in N/m² (newtons per square metre).',
        'Like speed, these are <strong>compound measures</strong>: they combine two other measurements. A formula triangle helps.'
      ],
      eg: 'A 600 g block has volume 75 cm³:\ndensity = 600 ÷ 75 = 8 g/cm³\n\nForce 120 N on 0.5 m²:\npressure = 120 ÷ 0.5 = 240 N/m²'
    },
    make(level) {
      const d = pick([2, 2.5, 3, 4, 7, 8, 11, 19]);
      const v = rand(4, 30) * 5;
      const m = roundDp(d * v, 2);
      const metals = { 2: 'plastic', 2.5: 'glass', 3: 'stone', 4: 'crystal', 7: 'iron', 8: 'steel', 11: 'lead', 19: 'gold' };
      const type = level === 'foundation' ? pick(['density', 'mass']) : pick(['volume', 'pressure']);
      if (type === 'density') {
        return {
          prompt: 'A ' + metals[d] + ' block has a mass of ' + m + ' g and a volume of ' + v + ' cm³. What is its density in g/cm³?',
          kind: 'number',
          hints: ['Density tells you the mass of each cm³.', 'Density = mass ÷ volume.', 'Work out ' + m + ' ÷ ' + v + '.'],
          solution: ['Density = mass ÷ volume', '= ' + m + ' ÷ ' + v + ' = ' + d + ' g/cm³'],
          answer: d + ' g/cm³',
          check: numberChecker(d, [{ value: roundDp(v / m, 6), message: 'Upside down: density is mass ÷ volume.' }])
        };
      }
      if (type === 'mass') {
        return {
          prompt: 'A ' + metals[d] + ' block has a density of ' + d + ' g/cm³ and a volume of ' + v + ' cm³. What is its mass in grams?',
          kind: 'number',
          hints: ['Each cm³ has a mass of ' + d + ' g. How many cm³ are there?', 'Mass = density × volume.', 'Work out ' + d + ' × ' + v + '.'],
          solution: ['Mass = density × volume', '= ' + d + ' × ' + v + ' = ' + m + ' g'],
          answer: m + ' g',
          check: numberChecker(m, [{ value: roundDp(v / d, 6), message: 'Mass = density × volume, so multiply (don’t divide).' }])
        };
      }
      if (type === 'volume') {
        return {
          prompt: 'A ' + metals[d] + ' block has a mass of ' + m + ' g and a density of ' + d + ' g/cm³. What is its volume in cm³?',
          kind: 'number',
          hints: ['Density = mass ÷ volume. Rearrange it to find the volume.', 'Volume = mass ÷ density.', 'Work out ' + m + ' ÷ ' + d + '.'],
          solution: ['Volume = mass ÷ density', '= ' + m + ' ÷ ' + d + ' = ' + v + ' cm³'],
          answer: v + ' cm³',
          check: numberChecker(v, [{ value: roundDp(m * d, 6), message: 'Volume = mass ÷ density, so divide.' }])
        };
      }
      const area = pick([0.2, 0.25, 0.4, 0.5, 2, 4, 5]);
      const pressure = rand(3, 40) * 10;
      const force = roundDp(pressure * area, 2);
      return {
        prompt: 'A box pushes down with a force of ' + force + ' N on an area of ' + area + ' m². What pressure does it make, in N/m²?',
        kind: 'number',
        hints: ['Pressure is the force on each square metre.', 'Pressure = force ÷ area.', 'Work out ' + force + ' ÷ ' + area + '.'],
        solution: ['Pressure = force ÷ area', '= ' + force + ' ÷ ' + area + ' = ' + pressure + ' N/m²'],
        answer: pressure + ' N/m²',
        check: numberChecker(pressure, [{ value: roundDp(force * area, 6), message: 'Pressure = force ÷ area, so divide.' }])
      };
    }
  });

  // ----- Algebraic proportion -----
  M.register({
    id: 'proportion-formula', keywords: 'directly inversely proportional proportionality constant k variation', name: 'Proportion formulas', strand: 'ratio', year: 'Y10', example: 'y ∝ x²',
    learn: {
      title: 'How do I solve proportion with formulas?',
      body: [
        '<strong>y is directly proportional to x</strong> (y ∝ x) means y = kx for some number k.',
        'It can also be proportional to x² (y = kx²), √x, and so on. <strong>Inversely proportional</strong> means y = k/x: as x gets bigger, y gets smaller.',
        'Method: write the formula with k, put in the values you know to find k, then use the formula.'
      ],
      eg: 'y ∝ x², and y = 36 when x = 3\n36 = k × 9, so k = 4\nWhen x = 5: y = 4 × 25 = 100'
    },
    make(level) {
      const k = rand(2, 9);
      const type = level === 'foundation' ? 'direct' : pick(['square', 'inverse']);
      const x1 = rand(2, 6);
      let x2 = rand(2, 10);
      while (x2 === x1) x2 = rand(2, 10);
      if (type === 'direct') {
        return {
          prompt: 'y is directly proportional to x. When x = ' + x1 + ', y = ' + k * x1 + '. Find y when x = ' + x2 + '.',
          kind: 'number',
          hints: ['Directly proportional means y = kx for some number k.', 'Put x = ' + x1 + ' and y = ' + k * x1 + ' into y = kx to find k.', k * x1 + ' = k × ' + x1 + ', so k = ' + k + '. Now use y = ' + k + 'x with x = ' + x2 + '.'],
          solution: ['y = kx', k * x1 + ' = k × ' + x1 + ', so k = ' + k, 'y = ' + k + ' × ' + x2 + ' = ' + k * x2],
          answer: String(k * x2),
          check: numberChecker(k * x2)
        };
      }
      if (type === 'square') {
        return {
          prompt: 'y is directly proportional to x². When x = ' + x1 + ', y = ' + k * x1 * x1 + '. Find y when x = ' + x2 + '.',
          kind: 'number',
          hints: ['y ∝ x² means y = kx².', 'Put x = ' + x1 + ' and y = ' + k * x1 * x1 + ' into y = kx². Remember to square the x.', k * x1 * x1 + ' = k × ' + x1 * x1 + ', so k = ' + k + '. Now work out ' + k + ' × ' + x2 + '².'],
          solution: ['y = kx²', k * x1 * x1 + ' = k × ' + x1 + '² = k × ' + x1 * x1 + ', so k = ' + k, 'y = ' + k + ' × ' + x2 + '² = ' + k + ' × ' + x2 * x2 + ' = ' + k * x2 * x2],
          answer: String(k * x2 * x2),
          check: numberChecker(k * x2 * x2, [{ value: k * x1 * x2, message: 'That treats it as y = kx. It’s proportional to x², so square the x values.' }])
        };
      }
      const K = k * x1 * pick([2, 3, 4, 6]);
      const xs = [2, 3, 4, 5, 6, 8, 10, 12].filter(x => K % x === 0 && x !== x1);
      const xB = pick(xs.length ? xs : [1]);
      return {
        prompt: 'y is inversely proportional to x. When x = ' + x1 + ', y = ' + K / x1 + '. Find y when x = ' + xB + '.',
        kind: 'number',
        hints: ['Inversely proportional means y = k ÷ x. As x gets bigger, y gets smaller.', 'Put x = ' + x1 + ' and y = ' + K / x1 + ' into y = k/x to find k.', K / x1 + ' = k ÷ ' + x1 + ', so k = ' + K + '. Now work out ' + K + ' ÷ ' + xB + '.'],
        solution: ['y = k/x', K / x1 + ' = k ÷ ' + x1 + ', so k = ' + K, 'y = ' + K + ' ÷ ' + xB + ' = ' + K / xB],
        answer: String(K / xB),
        check: numberChecker(K / xB, [{ value: roundDp(K / x1 / x1 * xB, 6), message: 'That treats it as direct proportion. Inversely proportional means y = k ÷ x.' }])
      };
    }
  });

  // ===================== GEOMETRY =====================

  const toRad = d => d * PI / 180;
  const RATIO_NAME = { sin: 'SOH (sin)', cos: 'CAH (cos)', tan: 'TOA (tan)' };
  const toDeg = r => r * 180 / PI;

  // ----- Trigonometry -----
  M.register({
    id: 'trigonometry', keywords: 'trigonometry trig sin cos tan sohcahtoa right-angled triangle angle side', name: 'Trigonometry', strand: 'geometry', year: 'Y10', example: 'SOHCAHTOA',
    learn: {
      title: 'How does trigonometry (SOHCAHTOA) work?',
      body: [
        'In a right-angled triangle, label the sides from the angle you’re using: <strong>hypotenuse</strong> (longest, opposite the right angle), <strong>opposite</strong> (across from the angle) and <strong>adjacent</strong> (next to the angle).',
        '<strong>SOH CAH TOA</strong>: sin = opposite ÷ hypotenuse, cos = adjacent ÷ hypotenuse, tan = opposite ÷ adjacent.',
        'Pick the ratio that uses the two sides you know or want. To find an angle, use the inverse: sin⁻¹, cos⁻¹ or tan⁻¹ (shift on your calculator).',
        'Make sure your calculator is in degrees (it shows D or DEG).'
      ],
      eg: 'Hypotenuse 10 cm, angle 30°. Opposite side?\nsin 30° = opp ÷ 10\nopp = 10 × sin 30° = 5 cm'
    },
    make(level) {
      const angle = rand(15, 75);
      if (level === 'foundation') {
        const known = pick(['hyp', 'adj']);
        const L = rand(4, 20);
        let want, ratio, exact, calc, wrongs;
        if (known === 'hyp') {
          want = pick(['opposite', 'adjacent']);
          ratio = want === 'opposite' ? 'sin' : 'cos';
          exact = L * (ratio === 'sin' ? Math.sin(toRad(angle)) : Math.cos(toRad(angle)));
          calc = L + ' × ' + ratio + ' ' + angle + DEG;
          wrongs = [L * (ratio === 'sin' ? Math.cos(toRad(angle)) : Math.sin(toRad(angle))), L * Math.tan(toRad(angle))];
        } else {
          want = 'opposite';
          ratio = 'tan';
          exact = L * Math.tan(toRad(angle));
          calc = L + ' × tan ' + angle + DEG;
          wrongs = [L * Math.sin(toRad(angle)), L * Math.cos(toRad(angle))];
        }
        const value = roundDp(exact, 1);
        const knownName = known === 'hyp' ? 'hypotenuse' : 'side adjacent to the ' + angle + DEG + ' angle';
        return {
          prompt: 'In a right-angled triangle, the ' + knownName + ' is ' + L + ' cm. Find the side ' + (want === 'opposite' ? 'opposite' : 'adjacent to') + ' the ' + angle + DEG + ' angle, to 1 decimal place.',
          kind: 'number',
          hints: [
            'Label the sides from the ' + angle + DEG + ' angle. You know the ' + (known === 'hyp' ? 'hypotenuse' : 'adjacent') + ' and want the ' + want + '. Which of SOH, CAH, TOA uses those two?',
            'It’s ' + RATIO_NAME[ratio] + '. Write ' + ratio + ' ' + angle + DEG + ' = ' + want + ' ÷ ' + L + '.',
            'Multiply both sides by ' + L + ': ' + want + ' = ' + calc + '. Check your calculator is in degrees.'
          ],
          solution: [ratio + ' ' + angle + DEG + ' = ' + want + ' ÷ ' + L, want + ' = ' + calc, '= ' + roundDp(exact, 4) + '… = ' + value + ' cm (1 d.p.)'],
          answer: value + ' cm',
          check: numberChecker(value, wrongs.map(w => ({ value: roundDp(w, 1), message: 'Check which ratio to use. Label the sides (hypotenuse, opposite, adjacent) then pick from SOH CAH TOA.' })).filter(m => m.value !== value), { dp: 1, exact })
        };
      }
      // Find an angle
      const pairs = pick([['opposite', 'hypotenuse', 'sin'], ['adjacent', 'hypotenuse', 'cos'], ['opposite', 'adjacent', 'tan']]);
      const [s1, s2, ratio] = pairs;
      let a, b;
      if (ratio === 'tan') { a = rand(3, 20); b = rand(3, 20); } else { b = rand(6, 25); a = rand(2, b - 1); }
      const inv = ratio === 'sin' ? Math.asin(a / b) : ratio === 'cos' ? Math.acos(a / b) : Math.atan(a / b);
      const exact = toDeg(inv), value = roundDp(exact, 1);
      return {
        prompt: 'In a right-angled triangle, the side ' + (s1 === 'opposite' ? 'opposite angle x' : 'adjacent to angle x') + ' is ' + a + ' cm and the ' + (s2 === 'hypotenuse' ? 'hypotenuse' : 'side adjacent to angle x') + ' is ' + b + ' cm. Find angle x, to 1 decimal place.',
        kind: 'number',
        hints: [
          'You know the ' + s1 + ' and the ' + s2 + '. Which ratio from SOH CAH TOA uses those two sides?',
          'Use ' + ratio + ' x = ' + s1 + ' ÷ ' + s2 + ' = ' + a + '/' + b + '. To find the angle itself, use the inverse: ' + ratio + '⁻¹.',
          'x = ' + ratio + '⁻¹(' + a + ' ÷ ' + b + '). Type it into your calculator in degrees mode.'
        ],
        solution: [ratio + ' x = ' + a + ' ÷ ' + b, 'x = ' + ratio + '⁻¹(' + a + ' ÷ ' + b + ')', '= ' + roundDp(exact, 4) + '… = ' + value + DEG + ' (1 d.p.)'],
        answer: value + DEG,
        check: numberChecker(value, [{ value: roundDp(a / b, 1), message: 'That’s the ratio ' + a + ' ÷ ' + b + '. Use the inverse (' + ratio + '⁻¹) to turn it into an angle.' }].filter(m => m.value !== value), { dp: 1, exact })
      };
    }
  });

  // ----- Similar shapes -----
  M.register({
    id: 'similar', keywords: 'similar shapes scale factor enlargement area volume ratio', name: 'Similar shapes', strand: 'geometry', year: 'Y10', example: 'Scale factor 3',
    learn: {
      title: 'How do similar shapes work?',
      body: [
        '<strong>Similar</strong> shapes have the same shape but different sizes. Every length is multiplied by the same <strong>scale factor</strong>.',
        'Find the scale factor by dividing a length on the big shape by the matching length on the small shape.',
        'Watch out: if lengths are multiplied by k, <strong>areas are multiplied by k²</strong> and volumes by k³.'
      ],
      eg: 'Matching sides 4 cm and 12 cm: scale factor = 12 ÷ 4 = 3\nA 5 cm side becomes 5 × 3 = 15 cm\nAn area of 10 cm² becomes 10 × 3² = 90 cm²'
    },
    make(level) {
      const k = pick([2, 3, 4, 5, 1.5, 2.5]);
      if (level === 'foundation') {
        const a = rand(2, 10) * 2, b = rand(2, 12) * 2;
        const A = roundDp(a * k, 2), B = roundDp(b * k, 2);
        return {
          prompt: 'Two triangles are similar. The small one has sides of ' + a + ' cm and ' + b + ' cm. On the large one, the side that matches ' + a + ' cm is ' + A + ' cm. How long is the side that matches ' + b + ' cm?',
          kind: 'number',
          hints: ['Similar shapes: every length is multiplied by the same scale factor.', 'Find the scale factor from the matching sides: ' + A + ' ÷ ' + a + '.', 'The scale factor is ' + k + '. Multiply ' + b + ' by it.'],
          solution: ['Scale factor = ' + A + ' ÷ ' + a + ' = ' + k, b + ' × ' + k + ' = ' + B + ' cm'],
          answer: B + ' cm',
          check: numberChecker(B, [{ value: roundDp(b + (A - a), 2), message: 'You added the difference. Similar shapes multiply every length by the same scale factor.' }])
        };
      }
      const kk = pick([2, 3, 4]);
      const area = rand(2, 15) * 2;
      const big = area * kk * kk;
      return {
        prompt: 'Two shapes are similar. The lengths of the large shape are ' + kk + ' times the lengths of the small shape. The small shape has an area of ' + area + ' cm². What is the area of the large shape?',
        kind: 'number',
        hints: ['Careful: the lengths are multiplied by ' + kk + ', but area is length × length.', 'If lengths are multiplied by ' + kk + ', area is multiplied by ' + kk + '². What is ' + kk + '²?', 'The area scale factor is ' + kk * kk + '. Work out ' + area + ' × ' + kk * kk + '.'],
        solution: ['Length scale factor = ' + kk, 'Area scale factor = ' + kk + '² = ' + kk * kk, area + ' × ' + kk * kk + ' = ' + big + ' cm²'],
        answer: big + ' cm²',
        check: numberChecker(big, [{ value: area * kk, message: 'That uses the length scale factor. For area, square it: ' + kk + '² = ' + kk * kk + '.' }])
      };
    }
  });

  // ----- Arcs and sectors -----
  M.register({
    id: 'sectors', keywords: 'arc length sector area circle fraction pi angle', name: 'Arcs and sectors', strand: 'geometry', year: 'Y10', example: '90° sector, r = 6 cm',
    learn: {
      title: 'How do I find arc lengths and sector areas?',
      body: [
        'A <strong>sector</strong> is a slice of a circle, like a slice of pizza. Its curved edge is the <strong>arc</strong>.',
        'The sector is a fraction of the whole circle: angle ÷ 360.',
        '<strong>Arc length</strong> = (angle ÷ 360) × 2πr. <strong>Sector area</strong> = (angle ÷ 360) × πr².',
        'You can round, or give an exact answer in terms of π, like 3π.'
      ],
      eg: '90° sector, radius 6 cm:\narc = 90/360 × 2 × π × 6 = 3π = 9.4 cm\narea = 90/360 × π × 36 = 9π = 28.3 cm²'
    },
    make(level) {
      const angle = pick([30, 40, 45, 60, 72, 80, 90, 100, 120, 135, 150, 210, 240, 270]);
      const r = rand(3, 15);
      const fracText = angle + '/360';
      if (level === 'foundation') {
        const exact = angle / 360 * 2 * PI * r, value = roundDp(exact, 1);
        return {
          prompt: 'A sector has angle ' + angle + DEG + ' and radius ' + r + ' cm. Find its arc length, to 1 decimal place.',
          kind: 'number',
          hints: ['The arc is a fraction of the whole circumference. What fraction of a full turn is ' + angle + DEG + '?', 'It’s ' + fracText + ' of the circle. The full circumference is 2 × π × ' + r + '.', 'Work out ' + fracText + ' × 2 × π × ' + r + ' and round to 1 decimal place.'],
          solution: ['Arc length = ' + fracText + ' × 2π × ' + r, '= ' + roundDp(exact, 4) + '…', '= ' + value + ' cm (1 d.p.)'],
          answer: value + ' cm',
          check: numberChecker(value, [{ value: roundDp(angle / 360 * PI * r * r, 1), message: 'That’s the sector area. Arc length uses the circumference, 2πr.' }, { value: roundDp(2 * PI * r, 1), message: 'That’s the whole circumference. The arc is only ' + fracText + ' of it.' }], { dp: 1, exact })
        };
      }
      const exact = angle / 360 * PI * r * r, value = roundDp(exact, 1);
      return {
        prompt: 'A sector has angle ' + angle + DEG + ' and radius ' + r + ' cm. Find its area, to 1 decimal place.',
        kind: 'number',
        hints: ['The sector is a fraction of the whole circle’s area. What fraction is ' + angle + DEG + ' out of 360' + DEG + '?', 'The whole circle’s area is π × ' + r + '² = ' + r * r + 'π.', 'Work out ' + fracText + ' × ' + r * r + 'π and round to 1 decimal place.'],
        solution: ['Sector area = ' + fracText + ' × π × ' + r + '²', '= ' + roundDp(exact, 4) + '…', '= ' + value + ' cm² (1 d.p.)'],
        answer: value + ' cm²',
        check: numberChecker(value, [{ value: roundDp(angle / 360 * 2 * PI * r, 1), message: 'That’s the arc length. Area uses πr².' }, { value: roundDp(PI * r * r, 1), message: 'That’s the whole circle. The sector is only ' + fracText + ' of it.' }], { dp: 1, exact })
      };
    }
  });

  // ----- Surface area -----
  M.register({
    id: 'surface-area', keywords: 'surface area net cuboid cylinder prism faces', name: 'Surface area', strand: 'geometry', year: 'Y10', example: 'Cuboid 5 × 4 × 3',
    learn: {
      title: 'How do I find surface area?',
      body: [
        '<strong>Surface area</strong> is the total area of all the outside faces, like the amount of wrapping paper needed. It’s measured in cm².',
        '<strong>Cuboid:</strong> 6 rectangular faces in 3 matching pairs: 2(lw + lh + wh).',
        '<strong>Cylinder:</strong> two circles (πr² each) plus the curved side, which unrolls into a rectangle: 2πr × h. Total = 2πr² + 2πrh.'
      ],
      eg: 'Cuboid 5 × 4 × 3:\n2 × (20 + 15 + 12) = 94 cm²'
    },
    make(level) {
      if (level === 'foundation') {
        const l = rand(2, 12), w = rand(2, 10), h = rand(2, 9);
        const value = 2 * (l * w + l * h + w * h);
        return {
          prompt: 'A cuboid measures ' + l + ' cm by ' + w + ' cm by ' + h + ' cm. What is its surface area?',
          kind: 'number',
          hints: ['A cuboid has 6 faces, in 3 matching pairs (top and bottom, front and back, two sides).', 'Find the area of one of each pair: ' + l + ' × ' + w + ', ' + l + ' × ' + h + ' and ' + w + ' × ' + h + '.', 'Those are ' + l * w + ', ' + l * h + ' and ' + w * h + '. Add them, then double it for the pairs.'],
          solution: [l + ' × ' + w + ' = ' + l * w + ',  ' + l + ' × ' + h + ' = ' + l * h + ',  ' + w + ' × ' + h + ' = ' + w * h, '2 × (' + l * w + ' + ' + l * h + ' + ' + w * h + ') = ' + value + ' cm²'],
          answer: value + ' cm²',
          check: numberChecker(value, [{ value: l * w * h, message: 'That’s the volume. Surface area is the total area of the 6 faces.' }, { value: l * w + l * h + w * h, message: 'That’s only 3 of the 6 faces. Each one has a matching pair, so double it.' }])
        };
      }
      const r = rand(2, 9), h = rand(3, 15);
      const exact = 2 * PI * r * r + 2 * PI * r * h, value = roundDp(exact, 1);
      return {
        prompt: 'A closed cylinder has radius ' + r + ' cm and height ' + h + ' cm. Find its total surface area, to 1 decimal place.',
        kind: 'number',
        hints: ['A closed cylinder has three parts: a circle on top, a circle on the bottom, and the curved side.', 'Each circle is π × ' + r + '². The curved side unrolls into a rectangle, 2π × ' + r + ' long and ' + h + ' high.', 'Total = 2 × π × ' + r * r + ' + 2 × π × ' + r + ' × ' + h + ' = ' + (2 * r * r + 2 * r * h) + 'π. Use your calculator and round.'],
        solution: ['Two circles: 2 × π × ' + r + '² = ' + 2 * r * r + 'π', 'Curved side: 2π × ' + r + ' × ' + h + ' = ' + 2 * r * h + 'π', 'Total = ' + (2 * r * r + 2 * r * h) + 'π = ' + value + ' cm² (1 d.p.)'],
        answer: value + ' cm²',
        check: numberChecker(value, [{ value: roundDp(2 * PI * r * h, 1), message: 'That’s just the curved side. Add the two circles on the ends.' }, { value: roundDp(PI * r * r * h, 1), message: 'That’s the volume. Surface area is the area of the outside.' }], { dp: 1, exact })
      };
    }
  });

  // ===================== PROBABILITY & STATISTICS =====================

  // ----- Combined events -----
  M.register({
    id: 'combined-events', keywords: 'tree diagrams combined events independent and or without replacement probability', name: 'Combined events', strand: 'stats', year: 'Y10', example: 'Tree diagrams',
    learn: {
      title: 'How do I find probabilities of combined events?',
      body: [
        'For two <strong>independent</strong> events (one doesn’t affect the other), <strong>P(A and B) = P(A) × P(B)</strong>. Multiply along the branches of a tree diagram.',
        'For "either/or" outcomes, add the probabilities of the different routes.',
        '<strong>Without replacement:</strong> after taking one item out, there are fewer left, so the second fraction changes. 5 red out of 8, then 4 red out of 7.'
      ],
      eg: 'Bag: 5 red, 3 blue. Take two without replacement.\nP(both red) = 5/8 × 4/7 = 20/56 = 5/14'
    },
    make(level) {
      if (level === 'foundation') {
        if (Math.random() < 0.5) {
          const p = rand(1, 9) / 10, q = rand(1, 9) / 10;
          const value = roundDp(p * q, 2);
          return {
            prompt: 'The probability that Sam’s bus is late is ' + p + '. The probability that it rains is ' + q + '. These are independent. What is the probability that the bus is late AND it rains?',
            kind: 'number',
            hints: ['"Independent" means one doesn’t affect the other.', 'For independent events, P(A and B) = P(A) × P(B). On a tree diagram you multiply along the branches.', 'Work out ' + p + ' × ' + q + '.'],
            solution: ['P(late and rain) = ' + p + ' × ' + q, '= ' + value],
            answer: String(value),
            check: numberChecker(value, [{ value: roundDp(p + q, 2), message: 'You added. For "and" with independent events, multiply.' }])
          };
        }
        const faces = pick([['a 6', 1], ['an even number', 3], ['a number greater than 4', 2]]);
        const n = faces[1];
        return {
          prompt: 'Two fair dice are rolled. What is the probability that both show ' + faces[0] + '? Give your answer as a fraction in its simplest form.',
          kind: 'fraction',
          hints: ['The two dice don’t affect each other, so they’re independent.', 'First find the probability for one dice: ' + n + ' out of 6. Then multiply for both.', 'Work out ' + n + '/6 × ' + n + '/6 and simplify.'],
          solution: ['P(one dice) = ' + frac(n, 6), 'P(both) = ' + n + '/6 × ' + n + '/6 = ' + n * n + '/36' + (frac(n * n, 36) !== n * n + '/36' ? ' = ' + frac(n * n, 36) : '')],
          answer: frac(n * n, 36),
          check: fractionChecker(n * n, 36, [{ n: 2 * n, d: 6, message: 'You added. For "both" (and), multiply the probabilities.' }], { allowDecimal: true })
        };
      }
      const red = rand(2, 7), blue = rand(2, 7), total = red + blue;
      if (Math.random() < 0.5) {
        return {
          prompt: 'A bag has ' + red + ' red and ' + blue + ' blue counters. Two are taken out without replacement. What is the probability that both are red? Give your answer as a fraction in its simplest form.',
          kind: 'fraction',
          hints: ['Without replacement: after the first red is taken, there’s one fewer red AND one fewer counter altogether.', 'First counter: P(red) = ' + red + '/' + total + '. Second counter: how many reds and how many counters are left?', 'It’s ' + red + '/' + total + ' × ' + (red - 1) + '/' + (total - 1) + '. Multiply, then simplify.'],
          solution: ['P(red first) = ' + red + '/' + total, 'P(red second) = ' + (red - 1) + '/' + (total - 1), 'P(both red) = ' + red + '/' + total + ' × ' + (red - 1) + '/' + (total - 1) + ' = ' + red * (red - 1) + '/' + total * (total - 1) + ' = ' + frac(red * (red - 1), total * (total - 1))],
          answer: frac(red * (red - 1), total * (total - 1)),
          check: fractionChecker(red * (red - 1), total * (total - 1), [{ n: red * red, d: total * total, message: 'That’s WITH replacement. Without replacement, the second fraction is ' + (red - 1) + '/' + (total - 1) + '.' }], { allowDecimal: true })
        };
      }
      return {
        prompt: 'A bag has ' + red + ' red and ' + blue + ' blue counters. Two are taken out without replacement. What is the probability of getting one of each colour? Give your answer as a fraction in its simplest form.',
        kind: 'fraction',
        hints: ['There are two ways to get one of each: red then blue, or blue then red. Find both and add them.', 'Red then blue: ' + red + '/' + total + ' × ' + blue + '/' + (total - 1) + '. Blue then red: ' + blue + '/' + total + ' × ' + red + '/' + (total - 1) + '.', 'Both routes give ' + red * blue + '/' + total * (total - 1) + '. Add them together and simplify.'],
        solution: ['Red then blue: ' + red + '/' + total + ' × ' + blue + '/' + (total - 1) + ' = ' + red * blue + '/' + total * (total - 1), 'Blue then red: ' + blue + '/' + total + ' × ' + red + '/' + (total - 1) + ' = ' + red * blue + '/' + total * (total - 1), 'Total = ' + 2 * red * blue + '/' + total * (total - 1) + ' = ' + frac(2 * red * blue, total * (total - 1))],
        answer: frac(2 * red * blue, total * (total - 1)),
        check: fractionChecker(2 * red * blue, total * (total - 1), [{ n: red * blue, d: total * (total - 1), message: 'That’s only one route. Blue then red also gives one of each, so add both routes.' }], { allowDecimal: true })
      };
    }
  });

  // ----- Grouped data -----
  M.register({
    id: 'grouped-data', keywords: 'grouped frequency table estimate mean midpoint class interval', name: 'Grouped data', strand: 'stats', year: 'Y10', example: 'Estimate the mean',
    learn: {
      title: 'How do I estimate the mean from grouped data?',
      body: [
        'In a grouped frequency table you don’t know the exact values, only which group (class) each one is in.',
        'Use the <strong>midpoint</strong> of each class as an estimate for every value in it.',
        'Multiply each midpoint by its frequency, add them up, then divide by the total frequency. It’s an <strong>estimate</strong> because we used midpoints.'
      ],
      eg: 'Time (min)  0–10  10–20  20–30\nFrequency     4      10      6\nMidpoints     5      15     25\n(5×4 + 15×10 + 25×6) ÷ 20 = 320 ÷ 20 = 16 minutes'
    },
    make(level) {
      const width = level === 'foundation' ? 10 : pick([5, 20]);
      const classes = level === 'foundation' ? 3 : 5;
      const freqs = Array.from({ length: classes }, () => rand(1, 12));
      const mids = freqs.map((_, i) => i * width + width / 2);
      const total = freqs.reduce((a, b) => a + b, 0);
      const fx = mids.reduce((acc, m, i) => acc + m * freqs[i], 0);
      const exact = fx / total, value = roundDp(exact, 1);
      const labels = freqs.map((_, i) => i * width + '–' + (i + 1) * width);
      // Pad each column so the frequencies line up under their groups
      const cols = labels.map(l => l.length + 3);
      return {
        prompt: 'The times (in minutes) that students spent on homework:\nTime:       ' + labels.map((l, i) => l.padEnd(cols[i])).join('') + '\nFrequency:  ' + freqs.map((f, i) => String(f).padEnd(cols[i])).join('') + '\nEstimate the mean time, to 1 decimal place.',
        kind: 'number',
        hints: [
          'You don’t know the exact times, so use the middle of each group (the midpoint) as an estimate.',
          'The midpoints are ' + mids.join(', ') + '. Multiply each midpoint by its frequency and add them up.',
          'The total of midpoint × frequency is ' + fx + ' and the total frequency is ' + total + '. Divide.'
        ],
        solution: ['Midpoints: ' + mids.join(', '), mids.map((m, i) => m + '×' + freqs[i]).join(' + ') + ' = ' + fx, 'Estimated mean = ' + fx + ' ÷ ' + total + ' = ' + value + ' minutes (1 d.p.)'],
        answer: String(value),
        check: numberChecker(value, [{ value: roundDp(fx / classes, 1), message: 'Divide by the total frequency (' + total + '), not the number of groups.' }, { value: roundDp(total / classes, 1), message: 'That’s the mean of the frequencies. Use midpoint × frequency.' }], { dp: 1, exact })
      };
    }
  });

})(this);
