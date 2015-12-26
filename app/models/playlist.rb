# == Schema Information
#
# Table name: playlists
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  title       :string           not null
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  slug        :string
#

class Playlist < ActiveRecord::Base
  extend FriendlyId

  belongs_to :user
  has_many :playlistings, dependent: :destroy
  has_many :tracks, through: :playlistings

  after_initialize :ensure_playlist_description

  before_save :parameterize_slug

  friendly_id :title, use: :slugged

  validates :title,
    presence: true,
    uniqueness: { scope: :user, case_sensitive: false }

  validates_presence_of :user
  validates_presence_of :tracks

  def self.find_by_username_and_slug(username, slug)
    user = User.find_by(username: username)

    return nil unless user

    user.playlists.find_by(slug: slug)
  end

  private

  def ensure_playlist_description
    self.description = "No description" if self.description.nil?
  end

  def parameterize_slug
    self.slug = self.title.parameterize
  end
end
