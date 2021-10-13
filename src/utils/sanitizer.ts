// import xss, { IFilterXSSOptions } from 'xss';
import xss from 'xss';

/**
 * DOM Sanitizer to protect against untrust inputs and XSS attacks
 *
 * @param {string} [dirtyInput=''] - Input to sanitize
 */

 function escapeHtml(html: string) {
  return html
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&#8211;/g, '-')
    .replace(/&#8217;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&#038;/g, '&')
    .replace(/&#039;/g, "'")
    .replace(/&#064;/g, '@');
}

const options = {
  onTag: function (tag: string, html: string) {
    if (tag === 'a' && html.substr(0, 14) === '<a class="img"') {
      return '';
    }
    if (tag === 'figure') {
      if (html.substr(0, 27) === '<figure class="wp-block-gal') {
        return html;
      } else {
        return '';
      }
    }
    if (tag === 'figcaption') {
      if (html.substr(0, 33) === '<figcaption class="blocks-gallery') {
        return html;
      } else {
        return '';
      }
    }
  },
  onTagAttr: function (tag: string, name: string, value: string) {
    if (tag === 'img' && name === 'src' && value.substr(0, 20) === '/wp-content/uploads/') {
      return `src="https://admin.site.com/${value}"`;
    }
    if (tag === 'a' && name === 'href' && value.substr(0, 20) === '/wp-content/uploads/') {
      return `src="https://admin.site.com/${value}"`;
    }
  },
  onIgnoreTag: function (tag: string, html: string) {
    if (tag.substr(0, 6) === 'iframe') {
      return html;
    }
  },
  escapeHtml: escapeHtml
};

// function sanitizer(dirtyInput: string, options?: IFilterXSSOptions): string {
function sanitizer(dirtyInput: string): string {
  return xss(dirtyInput, options);
}

export default sanitizer;
