import React, {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.buttonContainerHeight = '28px'

    this.state = {
      mainAsset: false,
      assetObserver: false
    };
  }

  componentDidMount() {
    document.body.style.transform = `translateY(${this.buttonContainerHeight})`;

    const mainAsset = this.findMainAsset();
    const mainAssetParent = mainAsset.tag.parentNode.parentNode.parentNode;

    this.setState({ mainAsset: mainAsset });

    this.assetMutationUpdater().observe(mainAssetParent, { childList: true });
  }

  assetMutationUpdater() {
    return new MutationObserver(() => {
      this.setState({ mainAsset: this.findMainAsset() });
    });
  }

  pickSourceFromSrcset(srcset, filterByConstraint) {
    return srcset.map((sourceAndConstraint) => {
      const [source, constraint] = sourceAndConstraint.split(' ');
      if (constraint === filterByConstraint) return source;
    }).join('').trim();
  }

  assetUrl(asset) {
    if (asset.srcset) {
      return this.pickSourceFromSrcset(asset.srcset.split(','), '1080w');
    } else {
      return asset.src;
    }
  }

  findLargeAsset(tagName) {
    const assets = document.querySelectorAll(tagName);

    if (assets) {
      return Array.from(assets).find((asset) => asset.clientWidth > 200) || false
    }

    return false
  }

  observeMainAsset(asset) {
    if (this.state.assetObserver) {
      this.state.assetObserver.observe(asset, { attributes: true });
    } else {
      const assetObserver = this.assetMutationUpdater();
      this.setState({ assetObserver: assetObserver });
      assetObserver.observe(asset, { attributes: true });
    }
  }

  findMainAsset() {
    const mainAsset = this.findLargeAsset('video') || this.findLargeAsset('img');

    if (mainAsset) {
      const mainAssetType = mainAsset.tagName;
      const secondaryUrl = mainAssetType === 'VIDEO' ? mainAsset.poster : false;

      this.observeMainAsset(mainAsset);

      return {
        tag: mainAsset,
        type: mainAssetType,
        url: this.assetUrl(mainAsset),
        secondaryUrl: secondaryUrl
      };
    }

    return false;
  }

  render() {
    const buttonContainerStyles = {
      background: '#3897f0',
      border: '1px solid #3897f0',
      display: 'block',
      font: '600 14px/26px -apple-system, BlinkMacSystemFont, sans-serif',
      height: this.buttonContainerHeight,
      left: '0',
      outline: 'none',
      padding: '0 8px',
      position: 'absolute',
      textAlign: 'center',
      top: `-${this.buttonContainerHeight}`,
      width: '100%',
      zIndex: '1'
    }

    const linkStyles = {
      color: '#fff',
      margin: '0 .5em'
    }

    return (
      <div style={buttonContainerStyles}>
        {this.state.mainAsset &&
          <a
            style={linkStyles}
            href={this.state.mainAsset.url}
            download={this.state.mainAsset.url}
          >Download {this.state.mainAsset.type === 'VIDEO' ? 'video' : 'image'}</a>
        }

        {(this.state.mainAsset && this.state.mainAsset.secondaryUrl) &&
          <a
            style={linkStyles}
            href={this.state.mainAsset.secondaryUrl}
            download={this.state.mainAsset.secondaryUrl}
          >Download video thumbnail</a>
        }
      </div>
    );
  }
}

export default App;
