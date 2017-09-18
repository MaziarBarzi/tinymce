test(
  'DetachTest',

  [
    'ephox.boss.mutant.Detach',
    'ephox.boss.mutant.Locator',
    'ephox.boss.mutant.Logger',
    'ephox.boss.mutant.Tracks',
    'ephox.katamari.api.Option'
  ],

  function (Detach, Locator, Logger, Tracks, Option) {
    var family = Tracks.track(
    {
      id: 'A',
      children: [
        { id: 'B', children: [ ] },
        { id: 'C', children: [
          { id: 'D', children: [
            { id: 'E', children: [] }
          ]},
          { id: 'F', children: [] }
        ]}
      ]
    }, Option.none());

    var check = function (expected, input, id) {
      var family = Tracks.track(input, Option.none());
      var target = Locator.byId(family, id).getOrDie();
      var actual = Detach.detach(family, target);
      assert.eq(expected, Logger.basic(family));
    };

    var checkNone = function (expected, input, id) {
      var family = Tracks.track(input, Option.none());
      var actual = Detach.detach(family, { id: id });
      assert.eq(false, actual.isSome());
    };

    check('A(B)', {
      id: 'A',
      children: [
        { id: 'B', children: [ ] },
        { id: 'C', children: [
          { id: 'D', children: [
            { id: 'E', children: [] }
          ]},
          { id: 'F', children: [] }
        ]}
      ]
    }, 'C');

    check('A(B,C(D(E)))', {
      id: 'A',
      children: [
        { id: 'B', children: [ ] },
        { id: 'C', children: [
          { id: 'D', children: [
            { id: 'E', children: [] }
          ]},
          { id: 'F', children: [] }
        ]}
      ]
    }, 'F');

    check('A(B,C(F))', {
      id: 'A',
      children: [
        { id: 'B', children: [ ] },
        { id: 'C', children: [
          { id: 'D', children: [
            { id: 'E', children: [] }
          ]},
          { id: 'F', children: [] }
        ]}
      ]
    }, 'D');

    checkNone('A(B)', {
      id: 'A',
      children: [
        { id: 'B', children: [ ] },
        { id: 'C', children: [
          { id: 'D', children: [
            { id: 'E', children: [] }
          ]},
          { id: 'F', children: [] }
        ]}
      ]
    }, 'Z');

    check('A(B,C(D(E)))', {
      id: 'A',
      children: [
        { id: 'B', children: [ ] },
        { id: 'C', children: [
          { id: 'D', children: [
            { id: 'E', children: [] }
          ]},
          { id: 'F', children: [] }
        ]}
      ]
    }, 'F');

  }
);
