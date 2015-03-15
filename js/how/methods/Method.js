/* @flow */

var Options = require('../Options');
var Requirement = require('./Requirement');

var React = require('react');
var html = require('html');

class Method {
  getName(): string {
    throw new Error('Must implement method');
  }

  isApplicable(
    content: Options.Content,
    container: Options.Container,
    horizontalAlignment: Options.HorizontalAlignment,
    verticalAlignment: Options.VerticalAlignment
  ): bool {
    return this.getRequirements().every(
      (r) => r.check(content, container, horizontalAlignment, verticalAlignment)
    );
  }

  getRequirements(): Array<Requirement> {
    throw new Error('Must implement method');
  }

  getCodeElement(
    content: Options.Content,
    container: Options.Container,
    horizontalAlignment: Options.HorizontalAlignment,
    verticalAlignment: Options.VerticalAlignment
  ): ReactElement {
    throw new Error('Must implement method');
  }

  getCode(
    content: Options.Content,
    container: Options.Container,
    horizontalAlignment: Options.HorizontalAlignment,
    verticalAlignment: Options.VerticalAlignment
  ): string {
    var element = this.getCodeElement(
      content,
      container,
      horizontalAlignment,
      verticalAlignment
    );
    var code = React.renderToStaticMarkup(element);
    var formattedCode = html.prettyPrint(
      code,
      {
        indent_size: 2,
        max_char: 50,
      }
    );
    return formattedCode;
  }
}

module.exports = Method;