import React from "react"
import PropTypes from "prop-types"
import {
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
} from "react-share"

import "../styles/share.scss"

export default function Share({ socialConfig, tags }) {
  return (
    <>
      Share:
      <div className="post-social">
        <TwitterShareButton
          url={socialConfig.config.url}
          className="button is-outlined is-rounded twitter"
          title={socialConfig.config.title}
          via={socialConfig.twitterHandle.split("@").join("")}
          hashtags={tags}
        >
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <LinkedinShareButton
          url={socialConfig.config.url}
          className="button is-outlined is-rounded linkedin"
          title={socialConfig.config.title}
        >
          <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>
        <RedditShareButton
          url={socialConfig.config.url}
          className="button is-outlined is-rounded reddit"
          title={socialConfig.config.title}
        >
          <RedditIcon size={32} round={true} />
        </RedditShareButton>
        <WhatsappShareButton
          url={socialConfig.config.url}
          className="button is-outlined is-rounded whatsapp"
          title={socialConfig.config.title}
        >
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
      </div>
    </>
  )
}

Share.propTypes = {
  socialConfig: PropTypes.shape({
    twitterHandle: PropTypes.string.isRequired,
    config: PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  }).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
}
Share.defaultProps = {
  tags: [],
}
