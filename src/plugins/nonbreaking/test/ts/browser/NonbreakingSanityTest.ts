import { ApproxStructure } from '@ephox/agar';
import { Pipeline } from '@ephox/agar';
import { TinyApis } from '@ephox/mcagar';
import { TinyLoader } from '@ephox/mcagar';
import { TinyUi } from '@ephox/mcagar';
import NonbreakingPlugin from 'tinymce/plugins/nonbreaking/Plugin';
import ModernTheme from 'tinymce/themes/modern/Theme';
import { UnitTest } from '@ephox/bedrock';

UnitTest.asynctest('browser.tinymce.plugins.nonbreaking.NonbreakingSanityTest', function() {
  var success = arguments[arguments.length - 2];
  var failure = arguments[arguments.length - 1];

  ModernTheme();
  NonbreakingPlugin();

  TinyLoader.setup(function (editor, onSuccess, onFailure) {
    var tinyUi = TinyUi(editor);
    var tinyApis = TinyApis(editor);

    Pipeline.async({}, [
      tinyUi.sClickOnToolbar('click on nbsp button', 'div[aria-label="Nonbreaking space"] > button'),
      tinyApis.sAssertContentStructure(ApproxStructure.build(function (s, str) {
        return s.element('body', {
          children: [
            s.element('p', {
              children: [
                s.text(str.is('\u00a0'))
              ]
            })
          ]
        });
      }))
    ], onSuccess, onFailure);
  }, {
    plugins: 'nonbreaking',
    toolbar: 'nonbreaking',
    skin_url: '/project/js/tinymce/skins/lightgray'
  }, success, failure);
});
