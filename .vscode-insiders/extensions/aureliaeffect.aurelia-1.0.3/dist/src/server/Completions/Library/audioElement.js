"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _elementStructure_1 = require("./_elementStructure");
class AudioElement extends _elementStructure_1.MozDocElement {
    constructor() {
        super();
        this.documentation = `The HTML <audio> element is used to embed sound content in documents. It may contain 
  one or more audio sources, represented using the src attribute or the <source> element; the browser will choose 
  the most suitable one.`;
        this.url = 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio';
        this.ariaRoles.push('application');
        this.permittedChildren.push(...['track', 'source']);
        this.attributes.set('autoplay', new _elementStructure_1.BindableAttribute(`A Boolean attribute; if specified (even if the value is "false"!), the audio will automatically begin playback as soon as it can do so, without waiting for the entire audio file to finish downloading.`));
        this.attributes.set('buffered', new _elementStructure_1.BindableAttribute(`An attribute you can read to determine which time ranges of the media have been buffered. This attribute contains a TimeRanges object.`));
        this.attributes.set('controls', new _elementStructure_1.BindableAttribute(`If this attribute is present, the browser will offer controls to allow the user to control audio playback, including volume, seeking, and pause/resume playback.`));
        this.attributes.set('loop', new _elementStructure_1.BindableAttribute(`A Boolean attribute; if specified, will automatically seek back to the start upon reaching the end of the audio.`, null, null, null, null, new Map([
            ['true', new _elementStructure_1.Value(`will automatically seek back to the start upon reaching the end of the audio`)],
            ['false', new _elementStructure_1.Value(`won't automatically seek back to the start upon reaching the end of the audio`)]
        ])));
        this.attributes.set('muted', new _elementStructure_1.BindableAttribute(`A Boolean attribute which indicates whether the audio will be initially silenced. Its default value is false.`, null, null, null, null, new Map([
            ['true', new _elementStructure_1.Value(`indicates whether the audio will be initially silenced`)],
            ['false', new _elementStructure_1.Value(`indicates whether the audio will not be silenced`)]
        ])));
        this.attributes.set('played', new _elementStructure_1.BindableAttribute(`A TimeRanges (https://developer.mozilla.org/en-US/docs/Web/API/TimeRanges) object indicating all the ranges of the audio that have been played`));
        this.attributes.set('preload', new _elementStructure_1.BindableAttribute(`This enumerated attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience.`, null, null, null, null, new Map([
            ['none', new _elementStructure_1.Value(`indicates that the audio should not be preloaded`)],
            ['metadata', new _elementStructure_1.Value(`indicates that only audio metadata (e.g. length) is fetched`)],
            ['auto', new _elementStructure_1.Value(`indicates that the whole audio file could be downloaded, even if the user is not expected to use it `)]
        ])));
        this.attributes.set('src', new _elementStructure_1.BindableAttribute(`The URL of the audio to embed. This is subject to HTTP access controls. This is optional; you may instead use the <source> element within the audio block to specify the audio to embed.`));
        this.attributes.set('volume', new _elementStructure_1.BindableAttribute(`The playback volume, in the range 0.0 (silent) to 1.0 (loudest).`));
        this.events = _elementStructure_1.GlobalAttributes.mediaEvents;
    }
}
exports.default = AudioElement;
//# sourceMappingURL=audioElement.js.map