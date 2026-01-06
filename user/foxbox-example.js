export const users = {
  user1: {
    profile: {
      name: "Test",
      email: "test@foxbox.sh",
      avatar: {
        name: "computer chip",
        image: "/images/user-avatars/computer-chip.svg",
      },
      country: {
        name: "United States",
        icon: "/images/country-flags/united-states.svg",
      },
      reminder: "abcd",
    },
    notifications: {
      notification1: {
        avatar: {
          name: "computer chip",
          image: "/images/user-avatars/computer-chip.svg",
        },
        type: "inbox",
        title: "Foxbox User invited you to join Foxbox",
        date: "Tue Oct 15 2024 04:17:19 GMT-0500 (Central Daylight Time)",
        link: "/",
        isUnread: true,
      },
    },
    settings: {
      notifications: {
        emailAlerts: false,
        pushNotifications: false,
        timeoutAlerts: 15,
      },
      privacy: {
        dataSharing: false,
        locationTracking: false,
      },
    },
    encryptedKeys: {
      encryptedSecretKey: "encryptedSecretKey",
      publicKey: "publicKey",
      encryptedPrivateKey: "encryptedPrivateKey",
    },
    vaults: {
      "all-vaults": {
        id: "all-vaults",
        name: "All Vaults (Read only)",
        illustration: {
          name: "Powder Blast",
          image: "/images/vault-illustrations/abstract-art/powder-blast.svg",
          background: "#AEC6CF",
        },
        description: "Browse all your items in one place, from every vault.",
        link: "/sandbox/pages/user/vaults/all-vaults/items",
        size: 2,
      },
      KW1uEkUGqLFgwRqqUva5: {
        id: "vault1",
        name: "Work Stuff",
        createdBy: "user1",
        createdByAvatar: {
          name: "Halloween Pumpkin",
          image: "/images/user-avatars/halloween-pumpkin.svg",
        },
        illustration: {
          name: "Pixel Chest",
          image: "/images/vault-illustrations/pixel-art/pixel-chest.svg",
          background: "#C0E8D5",
        },
        description:
          "All my job-related accounts and passwords. It's where I keep things like my work email, project management tools, and anything else I need to keep my professional life organized and secure.",
        size: 2,
        link: "/sandbox/pages/user/vaults/KW1uEkUGqLFgwRqqUva5",
        activityTrack: true,
        passwordPrompt: true,
        items: {
          ryWaqI7frHHcVdYTmWLf: {
            name: "My note",
            category: "note",
            icon: "/images/colored-icons/note-pad.svg",
            notes: "This is a note.",
            tags: [
              "Info",
              "Warning",
              "Important",
              "Starter Kit",
              "MindfulnessPractices",
            ],
            isFavorite: true,
            isDeleted: false,
            timestamps: {
              createdAt: "December 15, 2023 at 5:50:56 PM UTC-6",
              updatedAt: "December 17, 2023 at 1:33:42 AM UTC-6",
            },
          },
          a31LmVEZY771ZdNKp4TB: {
            name: "abc",
            category: "note",
            icon: "/images/colored-icons/note-pad.svg",
            notes: "This is a note.",
            tags: [
              "Info",
              "Warning",
              "Important",
              "Starter Kit",
              "MindfulnessPractices",
            ],
            isFavorite: true,
            isDeleted: false,
            timestamps: {
              createdAt: "December 16, 2023 at 5:50:56 PM UTC-6",
              updatedAt: "December 17, 2023 at 1:33:42 AM UTC-6",
            },
          },
        },
      },
    },
    files: {
      file1: {
        name: "my-design-december-at-one-of-the-cool.sketch",
        size: "15938355",
        createdBy: "user1",
        url: "url",
        path: "users/user1/files/my-design-december-at-one-of-the-cool.sketch@1234324234234",
      },
    },
  },
};

export const organizations = {
  NObMQ1fZIouv4UE4K3q9: {
    name: "My family",
    avatar: {
      name: "color wheel lotus",
      image: "/images/organization-avatars/color-wheel-lotus.svg",
    },
  },
};
