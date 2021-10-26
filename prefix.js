const core = require('@actions/core')

const handlePrefixes = (tags) => {
  const prefix = core.getInput('prefix', {required: false}) || ''
  const includeTagType = core.getInput('include_tag_type', {required: false})
  const regex = new RegExp(`^${prefix}`, 'g')
  const hasPrefix = Boolean(prefix)

  return tags
    .filter((tag) => {
      if (!hasPrefix) {
        return true
      }

      if (includeTagType === 'true') {
        return tag.startsWith(`${prefix}t`) || tag.startsWith(`${prefix}v`)
      }

      return tag.startsWith(prefix)
    })
    .map((tag) => {
      if (!hasPrefix) {
        return tag
      }

      return tag.replace(regex, '')
    })
}

module.exports = {handlePrefixes}
